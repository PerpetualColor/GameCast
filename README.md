# GameCast
Live sports game broadcasting

So here's our git repository for the project. Here's a few things you might want:

## How to get up and running
### Download the repository
1. Install `git` if you don't have it already. You can get it from https://git-scm.com/downloads
2. In a terminal, navigate to the directory where you want to store your code.
3. Run the command `git clone git://github.com/PerpetualColor/GameCast.git` to download the code.

### backend
1. Make sure [java](https://www.oracle.com/technetwork/java/javase/downloads/index.html) is installed.
2. Install [maven](https://maven.apache.org/download.cgi)
    1. Download one of the files listed in the page above - make sure to get a binary archive. I recommend `apache-maven-3.6.3-bin.zip`
    2. Extract it somewhere on your computer
    3. Navigate there in file explorer, and open the `bin` folder
    4. Add your directory path to your PATH variable - this will be different depending on your operating system.
        * OSX: https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path
        * Windows: https://docs.alfresco.com/4.2/tasks/fot-addpath.html 
        * Linux: you know what to do.
        
### frontend
1. Install [npm](https://www.npmjs.com/get-npm) using the installer. You don't need the extra tools they recommend.
2. Install `@angular/cli` globally - just run the command (after installing npm) `npm install -g @angular/cli`. If this fails, run it again a few times. If it continues to fail, look up your error message.
3. Install any missing dependencies by running `npm update` in the `frontend` directory.

### First launch
* To launch the backend, run the command `mvn spring-boot:run` in the `backend` directory
* To launch the frontend, run `ng serve` in the `frontend` directory. This will launch a development server on your machine, which can be accessed at `localhost:4200`

If all goes well, you should be ready to start programming now. Have fun!
