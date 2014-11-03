# Rescue Mission

## Installation

### Backend

```no-highlight
# Move into the backend directory
cd backend

# Install gem dependencies
bundle install

# Create/migrate/seed the database
rake db:setup
```

Create a `backend/.env` file and fill in your GitHub application credentials. You can find an example at `backend/.env.example`.

### Frontend

Before you get started, make sure you have [Node.js](node) and [Bower](bower)
installed. I'd recommend using [nvm](nvm) to install and manage different
versions of Node.js.

```no-highlight
# Move into the frontend directory
cd frontend

# Install npm dependencies
npm install

# Install Bower dependencies
bower install

# Symlink Foundation files into app/styles
ember g foundation-link
```

### Running the App

Since the frontend app and the backend server are separate, they need to both be
running in order for the app to work. You can start both apps at once by running
a rake task from the root directory.

```no-highlight
rake run
```

[bower]: http://bower.io/
[node]: http://nodejs.org/
[nvm]: https://github.com/creationix/nvm
