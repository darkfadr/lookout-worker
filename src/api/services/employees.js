import axios from 'axios';

const empsvc = axios.create({
  baseURL: 'https://appnet.ultimatesoftware.com/ISD.Employees.V3/',
  timeout: 15000
});

class Employee {
  constructor(baseURL = 'https://isdempsvc.ultimatesoftware.com/'){
    this.api = axios.create({ baseURL, timeout: 15000 });
  }

  findById(id){
    const field = parseInt(id) && 'ById' || 'GetEmployeeByAdUser';
    console.log('le route', `ultiemployees/${field}/${id}`)
    return this.api.get(`ultiemployees/${field}/${id}`)
      .then(res => Array.isArray(res.data) && res.data[0] || res.data)
      .then(user => {
        const {ID:id, EmployeeAddressEmail:email, EmployeePreferredFullName:fullname, ActiveDirectoryName:username,
          EmployeeDivision: division, EmployeeDepartment:department, DateOfSeniority: seniority,
          EmployeeManagerID: manager_id, EmployeeManagerName: manger_name} = user;

        return { id, username, email, fullname, manager_id, manger_name, division, department, seniority, };
      })
  }

  direct_reports(id){
    return this.api.get(`ultiemployees/ActiveEmployees`)
      .then(res => res.data)
      .then(data => data.filter(emp => emp.EmployeeManagerID == id))
      .then(data => data.map(user => {
        const {ID:id, EmployeeAddressEmail: email, EmployeePreferredFullName: fullname, ActiveDirectoryName: username} = user;
        return { id, username, email, fullname };
      }));
  }
}
const employee = new Employee();

export { employee }

