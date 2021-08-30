import express from 'express';
import data from '../data.json';
import _ from 'lodash';

const router = express.Router();

/* GET doctors listing. */
router.get('/',function(req, res, next){
  res.json(data.results);
});
router.get('/:search', function(req, res, next) {
  const searchParam = req.params.search.toLowerCase();
  let resultsArray=[];

  _.each(data.results, (obj, key) => {   
    if(obj.name.toLowerCase().includes(searchParam) || obj.specialty.toLowerCase().includes(searchParam)){
      resultsArray.push(obj)
    }
  });

  res.json(resultsArray);
  
});

export default router;
