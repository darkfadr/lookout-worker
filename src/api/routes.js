import log from '../logger';
import router from './utils';
import { UserController } from './controllers';

const temp = (req, res) => res.json({status: 'success', msg: 'Method not yet implemented'});

router.map({
  '/user/:id': {
    get: UserController.findById,
    post: temp
  },
  '/healthcheck': {get: temp}
});

export default router;

