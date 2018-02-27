import { employee } from '../services/employees';

class UserController {
  findById(req, res) {
    // console.log(req.params)
    employee.findById(req.params.id)
      .then(emp => {
        return employee.direct_reports(emp.id)
          .then(subs => {
            emp.direct_reports = subs;
            return emp;
          })
      })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err))
  }
}

export default new UserController();
