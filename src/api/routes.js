import log from '../logger';
import router from './utils';
import { CaseController, AlertController } from './controllers';

router.map({
  '/case': {
    get: CaseController.findAll,
    post: CaseController.create
  },
  '/detect': {post: CaseController.detect},
  '/alert':{
    get: AlertController.findAll,
    post: AlertController.create
  },
});

export default router;

