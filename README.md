# Application that helps run a small auto repair shop

- The application is a React-based.
- The application perform all user actions via the REST API, including authentication. (https://github.com/rugarcialopez/repair-api)
- Users must be able to create an account and log in.
- The application is a React-based using nextjs.
- Include at least 2 user roles: Manager and User.

Managers can:
- Create, Read, Edit, and Delete Repairs.
- Create, Read, Edit, and Delete Users and Managers.
- Filter repairs by date, time, User, complete, or incomplete.
- Update Repair as complete or incomplete.
- Assign Users to Repairs. Only one User may be assigned to a Repair.
- Can comment on any Repair at any time.
- Can approve Repairs marked as complete by Users.

Users can:
- Mark Repairs as complete. Users cannot undo this action.
- See a list of Repairs assigned to them and filter by date, time, and complete / incomplete.
- Comment on any Repairs at any time.

Repairs:
- Each repair has a date and a time.
- A repair always lasts for 1 hour.
- Repairs cannot overlap. Imagine that the same facility is being used for all repairs.
- Repairs can be marked complete or incomplete by a Manager.
- Repairs can be marked as complete by a User. Users cannot undo this action.
- All Repairs can be commented on.

## Deploy on heroku

Hosting URL: https://repair-shop-app.herokuapp.com/

