import mongoose from 'mongoose';
import carsData from './carscli.cars.js';

//Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//Connect to DB
mongoose.connect('mongodb://127.0.0.1/carscli');
const db = mongoose.connection;

//Import model
import Car from './models/car.js';

//Add Car 
const addCar = (car) => {
    Car.create(car).then(car => { 
        console.info('New car added');
        db.close();
    });
}

//Find Car
const findCar = (name) => { 
    const search = new RegExp(name, 'i');
    Car.find({$or: [{make: search}, {model: search}]})
        .then(car => {
            console.info(car);
            console.info(`${car.length} matches`);
            db.close();
        });
}

//Update Car
const updateCar = (_id, data) => {
    Car.updateOne({ _id }, data)
        .then(() => {
            console.info('Car Updated');
            db.close();
        })
}

//Remove Car
const removeCar = (_id) => {
    Car.deleteOne({ _id })
        .then(() => {
            console.info('Car Removed');
            db.close();
        });
}

const initializeCars = () => {
    Car.insertMany(carsData)
        .then(() => {
            console.info('Initialized Car Data');
            db.close();
        });
}

//Export Methods
export {addCar, findCar, removeCar, updateCar, initializeCars};