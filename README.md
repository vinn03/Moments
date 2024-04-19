# Moments

Moments is a geospatial journaling application that provides interactive features to assist in self reflection. This app can be used for daily journaling, viewing recorded memories, and to help manage emotions or habits. Users can decorate each entry with a response to a writing prompt and/or include multimedia such as images, which adds reflective meaning and depth to their personal narratives.

## Architecture:

- Frontend deployed on App Engine and served statically to clients through a public URL
- Requests to external APIs are made from the frontend for various app features
- Backend Express server is containerized w/ Docker and deployed on Cloud Run
- Manages CRUD operations for Users, Profiles, and Memos
- Handle media uploads to Cloud Storage Bucket (secured via Service Accounts)
- Backend connects to a hosted database (Mongo Atlas Cluster) using connection string
- Connection is authenticated with database username and password
- Firebase Auth used to manage user login credentials and account creation workflows


## Features:
### Memo Dashboard:

The dashboard page allows users to view all the locations associated with their “Moments”. It serves as a quick point of access for all the locations they visited and the moments they made. Each location in the list can be expanded to show all associated memos. From this list, a user can view a memo’s contents, edit the memo details, or delete the memo. 

### Memo Lenses:
The lens page offers three unique visualizations for users to view and reflect on their Moments. 
A Map, List, and Calendar view: 

Map View provides a geographic insight towards the user’s memos, presenting them all on a single map, with a corresponding table of memos presented below the map. 
This allows users to reflect on multiple locations of interests across all memos.

List View focuses on informational insight, displaying the memos as a list. Users can expand memo contents by clicking on them, revealing a zoomed-in map of the memo’s location. The remaining memo contents are displayed below the map. 
Additionally, memos can be sorted by title and creation date in either ascending or descending order. 

Calendar View emphasizes temporal insight, showcasing the number of memos on each calendar day, with the option for users to click on a day to view associated memo titles below the calendar.
This feature allows a user to visualize their journaling habits over time.

### Memo Creation:
The memo creation page presents a creation form to the user. Users first need to choose a location that their memo will be associated with. Users can either choose a new location by clicking/dragging the marker to a location on the embedded map, or select an existing location from the “Saved Locations” dropdown menu. Users can then give their memo journal entry a title, upload an associated image (optional), and write down their thoughts in the memo contents text area. Users can click “Reset” at the bottom of the form if they ever wish to clear all the form inputs. Users must click “Submit” to formally create the memo, which can then be viewed in either “Dashboard” or “Lens”.

### User Profile:
The user profile page presents the details of the user that is currently signed in. The following details are presented from top to bottom: profile picture, name, account username, account email, current status, and user bio. Users can also edit the “current status” and “user bio” attributes by clicking the “Edit Profile” button to change them using the provided input fields. To confirm profile changes, users must click “Update Profile” to do so. If users decide to change their minds, they can click “Cancel” to abort the process.
This feature is intended for future social networking purposes of the app where users would be able to share their highlighted memos with friends and family. 

### Admin Control Panel:
This control panel page is only available for the user who is logged in to the Moments admin account (see the test logins section below). This page allows an admin to fetch all information from the backend server and the database. They can view all created memos and user accounts. However, due to privacy reasons, admin users are unable to view the actual content for any memo or profile. For memos, they can only see information such as the memo id, user id, creation date, and the memo title. For user data, everything except the user password is displayed. 
This feature is intended for admin management of the app. For example, if a user has lost access to their account or wishes for their data to be deleted.

### Comments + Easily Missed Features:
With features that contain a map, the marker images may occasionally fail to load before the page does. In this case, refresh the page and try again.
With memo creation workflow, the marker can be moved with either click or drag actions. 
From the dashboard, when expanding a location you can view and edit the memo from that page.
