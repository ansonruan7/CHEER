import React from 'react';

const SubscribeForm = ({ closeForm }) => {
    return (
        <div className="fixed bottom-0 left-0 w-full flex justify-center items-center">
            <div className="subscribe-form bg-gray-100 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h2>
                <div className="flex justify-between">
                    <input type="email" placeholder="Your email address" className="py-2 px-4 w-3/4 border border-gray-300 rounded-md mr-2" />
                    <button type="submit" className="py-2 px-6 bg-blue-500 text-white rounded-md">Subscribe</button>
                </div>
                <button onClick={closeForm} className="mt-4 py-2 px-6 bg-gray-300 text-gray-700 rounded-md">Close</button>
            </div>
        </div>
    );
};

export default SubscribeForm;
