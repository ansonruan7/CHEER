const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(cookieParser());

// GCP serving the build, (CURRENTLY DOES NOT WORK WITH OUR BACKEND)
// app.use(express.static(path.join(__dirname, '../my-app/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

const uri = "mongodb+srv://ansonruan4:kcvVzdvmkH1Vco4b@se3350-22.99v1apl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}

run().catch(console.dir);

const db = client.db("CHEER");
const users = db.collection('users');
const events = db.collection('events');
const attendees = db.collection('attendees');
const newsletters = db.collection('newsletters');

// CHANGED to 8080 FOR GCP
let port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));

const router_users = express.Router();
router_users.use(express.json());
app.use('/api/users', router_users);

const router_events = express.Router();
router_events.use(express.json());
app.use('/api/events', router_events);

const router_attendees = express.Router();
router_attendees.use(express.json());
app.use('/api/attendees', router_attendees);

const router_newsletter = express.Router();
router_newsletter.use(express.json());
app.use('/api/newsletter', router_newsletter);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function closeDatabaseConnection() {
  try {

    console.log("Closed MongoDB connection");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Register new parent user with JWT for password
router_users.post('/register', async (req, res) => {
  try {
    const login = req.body;
    const hashedPassword = await bcrypt.hash(login.password, 10);
    let doc;
    if (login.type === "Private") {
      doc = {
        username: login.username,
        password: hashedPassword,
        email: login.email,
        type: login.type,
        parent: login.parent
      };
    } else {
      //when creating new account, it will be pending
      doc = {
        username: login.username,
        password: hashedPassword,
        email: login.email,
        type: login.type,
        status: 'Pending'
      };
    }

    await connectToDatabase();
    await users.insertOne(doc);

    res.status(200).json({ message: 'Registration Complete' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: 'Bad Request' });
  } finally {
    // Database connection remains open for other routes
  }
});

router_users.post('/login', async (req, res) => {
  try {
    const credentials = req.body;

    await connectToDatabase();

    const query = {
      email: credentials.email,
      status: 'Accepted'
    };

    const user = await users.findOne(query);

    if (user) {
      const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

      if (isPasswordValid) {
        const tokenPayload = {
          username: user.username,
          email: user.email,
          type: user.type
        };
        const token = jwt.sign(tokenPayload, 'key', { expiresIn: '1h' });
        //res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json({ message: 'Login Successful', token, user: { ...user, type: user.type } });

      } else {
        res.status(401).json({ error: 'Invalid Password' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await closeDatabaseConnection();
  }
});

router_users.delete('/delete', async (req, res) => {
  try {
    const username = req.body;
    await users.deleteOne(username);
    res.status(200).send('Deletion Successful');
  } catch (error) {
    res.status(404).send('User not found');
  } finally {
    // Database connection remains open for other routes
  }
});

router_users.post('/privRegister', async (req, res) => {
  try {
    const login = req.body;
    const hashedPassword = await bcrypt.hash(login.password, 10);

    const doc = {
      username: login.username,
      password: hashedPassword,
      email: login.email,
      type: 'Private',
      status: 'Pending',
      parent: login.parent
    };

    await client.connect();
    await users.insertOne(doc);

    res.status(200).json({ message: 'Registration Complete' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: 'Bad Request' });
  } finally {
    // Database connection remains open for other routes
  }
});

//register employee
router_users.post('/employeeRegister', async (req, res) => {
  try {
    const login = req.body;
    const hashedPassword = await bcrypt.hash(login.password, 10);

    const doc = {
      username: login.username,
      password: hashedPassword,
      email: login.email,
      type: 'Employee',
      status: 'Accepted',
      parent: null
    };

    await client.connect();
    await users.insertOne(doc);

    res.status(200).json({ message: 'Registration Complete' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: 'Bad Request' });
  } finally {
    // Database connection remains open for other routes
  }
});

//CHECK TOKEN -------------------------------------
function checkAuthenticated(req, res, next) {
  //get token from header
  const token = req.header('jwt_token');
  //check if token does not exist
  if (!token) {
    return res.status(403).json({ msg: "Authorization denied" });
  }
  //if token exists, verify it
  try {
    //storeID is stored in token payLoad as 'user'
    const verify = jwt.verify(token, 'key');
    req.email = verify.email;
    req.type = verify.type;
    //move on if token is verified
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid" })
  }
}
router_users.post('/verify', checkAuthenticated, (req, res) => {
  try {
    res.json({ email: req.email, type: req.type });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error")
  }
});

//return all pending parent accounts
router_users.post('/pending/parents', async (req, res) => {
  try {
    await client.connect();
    //get the event names and IDs for the queried date
    const parent_list = await users.find({ status: 'Pending', type: 'Parent' }).project({ email: 1, username: 1 }).toArray();
    res.json(parent_list);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(404).send('No parent accounts pending.');
  } finally {

  }
});

//pending private accounts
router_users.post('/pending/private', async (req, res) => {
  try {
    await client.connect();
    //get the event names and IDs for the queried date
    const private_list = await users.find({ status: 'Pending', type: 'Private' }).project({ parent: 1, username: 1, email: 1 }).toArray();
    res.json(private_list);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(404).send('No private accounts pending.');
  } finally {

  }
});

//approve an account
router_users.post('/approve', async (req, res) => {
  const { email } = req.body;
  try {
    await client.connect();
    //get the event names and IDs for the queried date
    await users.updateOne({ email: email }, { $set: { status: 'Accepted' } });
    res.status(200).json("Updated");
  } catch (error) {
    console.error('Error updating email status:', error);
    res.status(404).send('Email not found.');
  }
});

//decline an account
router_users.post('/decline', async (req, res) => {
  const { email } = req.body;
  try {
    await client.connect();
    //get the event names and IDs for the queried date
    await users.deleteOne({email: email});
    res.status(200).json("Updated");
  } catch (error) {
    console.error('Error updating email status:', error);
    res.status(404).send('Email not found.');
  }
});

//EVENT FUNCTIONALITIES ------------------------------------------------------------------------------------------------------------------------------
router_events.post('/create', async (req, res) => {
  try {
    await client.connect();
    // Get the next event ID
    const eventID = await getNextEventID();
    // Get login information from HTML body
    const event = req.body;
    // Create a document to be inserted
    const doc = {
      eventID: eventID,
      description: event.description,
      event_name: event.name,
      start_time: event.start_time,
      end_time: event.end_time,
      date: event.date,
      capacity: event.capacity
    };
    // Insert into database
    await events.insertOne(doc);
    // Send status response
    res.status(200).send('Event Created');
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Internal Server Error');
  }
});

//auto increment eventID
async function getNextEventID() {
  try {
    // Connect to MongoDB
    await client.connect();
    // Query for the maximum event ID
    const maxIDDocument = await events.find({}, { eventID: 1 }).sort({ eventID: -1 }).limit(1).toArray();
    // If there are documents with event IDs
    if (maxIDDocument.length > 0) {
      // Extract the maximum event ID
      const maxID = maxIDDocument[0].eventID;
      // Return the next event ID
      return maxID + 1;
    } else {
      // If no documents in the collection yet, start with 1
      return 1;
    }
  } catch (error) {
    console.error('Error fetching max event ID:', error);
    throw error;
  }
}


//ALL DATES MUST BE IN FORMAT: 'YYYY-MM-DD'
//get all events on a specifc date
router_events.post('/day', async (req, res) => {
  const { date } = req.body;
  try {
    await client.connect();
    //get the event names and IDs for the queried date
    const event_list = await events.find({ date: date }).project({ event_name: 1, eventID: 1 }).toArray();
    res.json(event_list);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(404).send('No events on date');
  } finally {

  }
});


//return all the dates in which there are events for a specific month/year
router_events.post('/monthly', async (req, res) => {
  const { date } = req.body;
  try {
    await client.connect();
    //get the event names and IDs for the queried date
    const event_list = await events.find({ date: { $regex: date, $options: 'i' } }).project({ date: 1, eventID: 1 }).toArray();
    res.json(event_list);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(404).send('No events on date');
  } finally {

  }
});

//return all the dates in which there are events for a specific month/year for a specifc child
router_events.post('/monthly', async (req, res) => {
  const { date, email } = req.body;
  try {
    await client.connect();
    //get the event names and IDs for the queried date
    const event_list = await events.find({ date: { $regex: date, $options: 'i' } }).project({ date: 1, eventID: 1 }).toArray();
    const child_event_list = await attendees.find({email:email}).toArray();

    res.json(event_list);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(404).send('No events on date');
  }
});

//return info of specific event based on ID
router_events.post('/event', async (req, res) => {
  const { eventID } = req.body;
  try {
    await client.connect();
    //get the event names and IDs for the queried date
    const event_list = await events.findOne({ eventID: eventID });
    res.json(event_list);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(404).send('No events on date');
  }
});

//get all events of a child user
router_events.post('/private', async (req, res) => {
  const email = req.body.email;
  const date = req.body.date;
  try {
    await client.connect();
    //get the event names and IDs for the queried date
    const attendee_list = await attendees.find({email: email}).toArray();
    let eventIDs = [];
    attendee_list.forEach((attendee)=>{
      eventIDs.push(attendee.eventID);
    })
    const event_list = await events.find({ date: { $regex: date, $options: 'i' } }).toArray();
    let private_events = [];
    for (const id of eventIDs){
      for (const e of event_list){
        if (e.eventID === id){
          private_events.push(e);
        }
      }
    }
    res.json(private_events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(404).send('No events on date');
  }
});

//ATTENDEE FUNCTIONALITIES ------------------------------------------------------------------------------------------------------------------------------
router_attendees.post('/create', async (req, res) => {
  try {
    // Get the next event ID
    const attendeeID = await getNextAttendeeID();
    // Get login information from HTML body
    const attendee = req.body;
    // Create a document to be inserted
    const doc = {
      attendeeID: attendeeID,
      email: attendee.email,
      parent_email: attendee.parent_email,
      eventID: attendee.eventID
    };
    // Insert into database
    await attendees.insertOne(doc);
    // Send status response
    res.status(200).send('Attendee Created');
  } catch (error) {
    console.error('Error creating attendee:', error);
    res.status(500).send('Internal Server Error');
  }
});

//auto increment eventID
async function getNextAttendeeID() {
  try {
    // Connect to MongoDB
    await client.connect();
    // Query for the maximum event ID
    const maxIDDocument = await attendees.find({}, { attendeeID: 1 }).sort({ attendeeID: -1 }).limit(1).toArray();
    // If there are documents with event IDs
    if (maxIDDocument.length > 0) {
      // Extract the maximum event ID
      const maxID = maxIDDocument[0].attendeeID;
      // Return the next event ID
      return maxID + 1;
    } else {
      // If no documents in the collection yet, start with 1
      return 1;
    }
  } catch (error) {
    console.error('Error fetching max attendee ID:', error);
    throw error;
  }
}

//get all children of a parent based on username
router_attendees.post('/children', async (req, res) => {
  const { parent_email } = req.body;
  try {
    await client.connect();
    //get the event names and IDs for the queried date
    const children_list = await users.find({ parent: parent_email }).project({ username: 1, email: 1 }).toArray();
    res.status(200).json(children_list);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(404).send('No events on date');
  } finally {

  }
});
// NEWSLETTER FUNCTIONALITIES
router_newsletter.post('/retrieve', async (req, res) => {
  try {
    await client.connect();
    const news_list = [];
    const cursor = await newsletters.find();
    for await (const doc of cursor) {
      news_list.push(doc);
    }
    res.status(200).send(news_list);
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    res.status(404).send('No newsletters found');
  } finally {

  }
});

//create newsletter
router_newsletter.post('/create', async (req, res) => {
  try {
    await client.connect();
    // Get login information from HTML body
    const newsletter = req.body;
    // Create a document to be inserted
    const doc = {
      newsName: newsletter.name,
      newsYear: newsletter.year,
      newsDay: newsletter.day,
      newsContent: newsletter.content
    };
    // Insert into database
    await newsletters.insertOne(doc);
    // Send status response
    res.status(200).send('Newsletter Created');
  } catch (error) {
    console.error('Error creating newsletter:', error);
    res.status(500).send('Internal Server Error');
  } finally {

  }
});


// Implement Clock In Function
router_users.post('/clock-in', checkAuthenticated, async (req, res) => {
  try {
    const { email } = req.body;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Get current time in seconds

    // Update the user's clock-in time in the database
    await users.updateOne(
      { email: email },
      { $set: { clockIn: currentTimeInSeconds } }
    );

    res.status(200).json({ message: 'Clock In Successful', currentTime: currentTimeInSeconds });
  } catch (error) {
    console.error('Error clocking in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router_users.post('/clock-out', checkAuthenticated, async (req, res) => {
  const { email } = req.body;
  try {
    // Retrieve the user's clock-in time from the database
    const user = await users.findOne({ email: email });

    if (!user || !user.clockIn) {
      return res.status(400).json({ error: 'User has not clocked in' });
    }

    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Get current time in seconds

    // Calculate work time in seconds
    const workTimeInSeconds = currentTimeInSeconds - user.clockIn;

    // Update the user's clock-out time and work time in the database
    await users.updateOne(
      { email: email },
      { $set: { clockOut: currentTimeInSeconds, workTime: workTimeInSeconds } }
    );

    res.status(200).json({ message: 'Clock Out Successful', currentTime: currentTimeInSeconds, workTime: workTimeInSeconds });
  } catch (error) {
    console.error('Error clocking out:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Close the MongoDB connection when the application is terminated
process.on('SIGINT', async () => {
  try {

    console.log("Closed MongoDB connection");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use(cors());

const server = http.createServer(app);

// Connecting server with the socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Which server is making calls to the server (React server on frontend)
    methods: ["GET", "POST"],
  }
});

// Listen for a connection/disconnection events
io.on('connection', (socket) => {
  console.log(`User: ${socket.id} connected`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User: ${socket.id} disconnected`);
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});


// Export the app for external use
module.exports = app;
