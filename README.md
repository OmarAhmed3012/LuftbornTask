# LuftbornTask

README

This is a task manager API that allows users to create, update, retrieve, and delete their tasks. The API also supports user authentication and authorization.
Models
Task

The Task model represents a task that a user needs to complete. It has the following attributes:

    title: A string that represents the task's title. It is required and trimmed.
    description: A string that represents the task's description. It is optional and trimmed.
    user_id: A string that represents the ID of the user who created the task. It is required.
    completed: A boolean that represents whether the task has been completed. It is optional and defaults to false.
    created_at: A timestamp that represents when the task was created.
    updated_at: A timestamp that represents when the task was last updated.

User

The User model represents a user of the task manager API. It has the following attributes:

    name: A string that represents the user's name. It is required and trimmed.
    email: A string that represents the user's email address. It is required, unique, and trimmed.
    password: A string that represents the user's password. It is required and has a minimum length of 6 characters.
    archive: A boolean that represents whether the user's account is archived. It is required and defaults to false.
    created_at: A timestamp that represents when the user's account was created.
    updated_at: A timestamp that represents when the user's account was last updated.

Controllers

Task Controller

The Task model has the following attributes:

    title: A string representing the title of the task. This attribute is required and trimmed.
    description: A string representing the description of the task. This attribute is optional and trimmed.
    user_id: A string representing the ID of the user that created the task. This attribute is required.
    completed: A boolean value indicating whether the task has been completed. This attribute is optional and defaults to false.
    created_at and updated_at: Timestamps representing when the task was created and last updated, respectively.

The Task controller provides the following functions:

    createTask: A function that creates a new task. It validates the request body using the createTaskSchema schema and checks for duplicate tasks. If the request body is valid and no duplicate task exists, the function creates a new task and returns it in the response.
    updateTask: A function that updates an existing task. It validates the request body using the createTaskSchema schema and updates the task with the given ID with the new values. If the update is successful, the function returns the updated task in the response.
    getTasks: A function that returns all tasks belonging to the authenticated user. It sorts the tasks by descending order of creation date and formats the created_at timestamp to a human-readable string.
    deleteTask: A function that deletes a task with the given ID.

Auth Controller

The User model has the following attributes:

    name: A string representing the name of the user. This attribute is required and trimmed.
    email: A string representing the email of the user. This attribute is required, trimmed, and unique.
    password: A string representing the password of the user. This attribute is required and must be at least 6 characters long.
    archive: A boolean value indicating whether the user account is archived. This attribute is required and defaults to false.
    created_at and updated_at: Timestamps representing when the user was created and last updated, respectively.

The Auth controller provides the following functions:

    registerPost: A function that registers a new user. It validates the request body using the userSchema schema and checks for matching passwords and duplicate emails. If the request body is valid and the email is not already in use, the function creates a new user and returns the user ID and JWT token in the response. The token is also set as an HTTP-only cookie.
    loginPost: A function that authenticates a user. It validates the request body using the authSchema schema and checks if the email and password match. If the credentials are valid, the function generates a JWT token and sets it as an HTTP-only cookie. It then returns the user ID and token in the response.
    logout: A function that clears the JWT token cookie from the client-side. It returns an empty response with an HTTP-only cookie that clears the token.

Conclusion

This task manager API provides basic functionality for managing tasks and authenticating users. The API utilizes the Task and User models to store task and user data, respectively. The Task controller provides functions for creating, updating, retrieving, and deleting tasks. The Auth controller provides functions for registering, authenticating, and logging out users. The API is designed to be simple and easy to use, and can be extended to provide additional functionality as needed.


 here are the steps to install dependencies and set up environment variables for a Node.js application:

    Install Node.js and npm (Node Package Manager) on your system if you haven't already.
    Navigate to the root directory of your Node.js application.
    Open the terminal and run the following command to install the required dependencies listed in the package.json file:

npm install

    Create a new file named ".env" in the root directory of your application.
    Open the ".env" file and add the following lines, replacing the placeholder values with your actual values:

MONGO_ATLAST_URI=<your_mongo_atlas_uri>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=<your_jwt_expires_in>
PORT=<your_application_port>

Note: You can obtain the values for MONGO_ATLAST_URI, JWT_SECRET, JWT_EXPIRES_IN, and PORT from the respective services you are using (e.g., MongoDB Atlas for MONGO_ATLAST_URI, or you can generate a random JWT_SECRET using a tool like uuid package, set JWT_EXPIRES_IN to the desired expiration time in seconds, and PORT to any available port number).

    Save the ".env" file.
    You can now access the values of the environment variables in your Node.js application using the process.env object. For example, to access the value of the MONGO_ATLAST_URI variable, you can use:


const mongoUri = process.env.MONGO_ATLAST_URI;

That's it! With these steps, you should now have your environment variables set up for my Node.js application.
