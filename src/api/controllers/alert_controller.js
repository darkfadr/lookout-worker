import turf from '@turf/helpers';
import faker from 'faker';
import {Alert} from '../models'
import temp from './temp';

const spotted = () => {
  return {
    id: faker.random.uuid(),
    longitude: faker.address.longitude(),
    latitude: faker.address.latitude(),
    case: {
      plate: faker.hacker.abbreviation()
    }
  }
}

const convert = a => {
  const point = turf.point([a.longitude, a.latitude]);
  return Object.assign({}, a, {point});
};

class AlertController {
  create(req, res) {
    Alert.create(body)
      .then(alert => res.status(200).json(alert))
      .then(err => res.status(500).json({success: false, err}))
  }
  findAll(req, res){
    const alerts = [];

    for(var i=0; i < 10; i++){
      alerts.push(spotted());
    }

    res.json(alerts
      );

    // Alert.find()
    //   .then(alerts => res.status(200).json(alerts))
    //   .catch(err => res.status(500).json({success: false, err}));
  }
}

export default new AlertController();
