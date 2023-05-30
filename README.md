# lets-chat-app-mern
A simple chat application created using the MERN stack.  This application is responsive and mobile-ready. I have a demo video of this project in this [link](https://youtu.be/4--kxfKSyXw)

# Technologies Used
* **Mongodb**
* **Express**  
* **React**
* **Nodejs**
* **Socket.io**
* **Sinch**
* **Twilio**
* **WebRTC**

# Notes
* Sinch Phone-to-app and vice-versa are not fully tested.
* At the time of creating this app, Sinch doesn't support direct inbound call to their SDK.
* This app doesn't have form validation.
* This app doesn't save chat and SMS messages to a database.
* User session credentials on the server-side are stored in memory. Storing user session in-memory is not recommended for production environment.

# Testing this project
You can clone this project and test it for yourself. However, you need to create .env files
and add these following variables:

## Front-end
| Key                               | Description                                 |
| --------------------------------- | :-----------------------------------------: |
| **SERVER_DOMAIN**                 | Domain of the app when deployed             | 
| **LOCAL_SERVER_DOMAIN**           | Server domain of the app during development |
| **SINCH_CLIENT_APP_KEY**          | Sinch SDK app key (sinch-rtc)               |
| **SINCH_CLIENT_ENVIRONMENT_HOST** | Region REST API endpoint for Sinch SDK      |

## Back-end
| Key                               | Description                                     |
| --------------------------------- | :---------------------------------------------: |
| **SERVER_DOMAIN**                 | Domain of the app when deployed                 | 
| **LOCAL_SERVER_DOMAIN**           | Server domain of the app during development     |
| **LOCAL_CLIENT_DOMAIN**           | Client domain of the app during development     |
| **PORT**                          | Server port                                     |
| **PASSWORD_SALT_ROUNDS**          | Salt rounds for bcrypt password encryption      |
| **MONGODB_URI**                   | MongoDB(Atlas) connection string                |
| **SESSION_SECRET_KEY**            | Random generated key for express cookie session |
|                                   |                                                 |
| **SINCH_SERVICE_PLAN_ID**         | Service plan ID of your Sinch account           |
| **SINCH_API_TOKEN**               | API token of your Sinch account                 |
| **SINCH_CLIENT_APP_KEY**          | Sinch SDK app key                               |
| **SINCH_CLIENT_APP_SECRET**       | Sinch SDK app secret                            |
| **SINCH_CLIENT_ENVIRONMENT_HOST** | Region REST API endpoint of your Sinch SDK      |
|                                   |                                                 |
| **TWILIO_ACCOUNT_SID**            | Account SID of your Twilio account              |
| **TWILIO_AUTH_TOKEN**             | Auth token of your Twilio account               |
| **TWILIO_TWIML_APP_SID**          | SID of your TWIML app                           |
| **TWILIO_API_KEY_SID**            | SID of your created Twilio's API key            |
| **TWILIO_API_KEY_SECRET**         | Secret Key of your created Twilio's API key     |

# Front-end Build Commands
The preferred deployment type of this app is same-domain deployment. This project has
two build types for front-end codebase:

**build-local** -> Use this if you wanna test your build locally before deployment. **SERVER_DOMAIN** and **LOCAL_SERVER_DOMAIN** must be equal.

**build-remote** -> Use this if you're building your front-end in a remote server. **SERVER_DOMAIN** must be the domain of your remote server.

You can use *yarn* or *npm* to execute these build commands.