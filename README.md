# Banker's Algorithm Simulation

<!-- ## Definition -->
A website that describes the implementation of Banker's Algorithm using queue datastructure.

**Banker's Algorithm is a resource allocation and deadlock avoidance algorithm that tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources, and then makes an "safe-state" check to test for possible deadlock conditions for all other pending activities, before deciding whether allocation should be allowed to continue.**

# Description🧠
This project includes simulation of Banker's Algorithm using double queue implementation (proposed by us).

One button will be provided to the user on the home page along with two drop down option to select number of resources and number of proceses for which program will be simulating the algorithm.

After that you will be directed to a page where you will be providing the resource values along with allocation and need of processes.
(For testing purpose, you can refer to input1.txt and input2.txt)

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Flask](https://flask.palletsprojects.com/en/2.1.x/)
* [p5js](https://p5js.org/)
* [Bulma](https://bulma.io/documentation/overview/)


# Run Demo💻
You can follow the steps provided below to start using this project:
1. Clone the repo
   ```sh
   git clone https://github.com/sumit-6/Banker-s-Algorithm-Visualizer.git
   ```
2. Install virtualenv first:
   ```
   pip install virtualenv
   ```
3. Create an environment using this command:
   ```
   virtualenv env
   ```

4. Enter into your environment using this command:
   ```
   env\Scripts\activate.bat
   ```
5. Install requirements.txt by running this command:
   ```
   pip install -r requirements.txt
   ```
6. Run the project:
   ```
   python app.py
   ```

# Website Looks
1. Home
![Home](https://github.com/sumit-6/Banker-s-Algorithm-Visualizer/blob/main/img/1.JPG)
2. Options provided
![Options](https://github.com/sumit-6/Banker-s-Algorithm-Visualizer/blob/main/img/2.JPG)
![Coordinates](https://github.com/sumit-6/Banker-s-Algorithm-Visualizer/blob/main/img/3.JPG)
![Start Randomly](https://github.com/sumit-6/Banker-s-Algorithm-Visualizer/blob/main/img/4.JPG)
3. Running Simulation
![Brute](https://github.com/sumit-6/Banker-s-Algorithm-Visualizer/blob/main/img/5.JPG) 
4. Safe State detection example
![Dynamic](https://github.com/sumit-6/Banker-s-Algorithm-Visualizer/blob/main/img/6.JPG)
5. Deadlock detection example
![Genetic](https://github.com/sumit-6/Banker-s-Algorithm-Visualizer/blob/main/img/7.JPG)
