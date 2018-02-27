import path from 'path';

//allows api to work in iis as a subappilication
export function iis(alias) {
  return (req, res, next) => {
    if (alias) {
      const route = req.url.replace(alias, '');  //only the first match is the namespace
      req.url = path.normalize(`/${route}`);
    }
    next();
  };
}
