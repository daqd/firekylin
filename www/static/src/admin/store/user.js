import Reflux from 'reflux';
import superagent from 'superagent';

import firekylin from '../../common/util/firekylin';

import UserAction from '../action/user';

export default Reflux.createStore({ 

  listenables: UserAction,
  /**
   * select user data
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  onSelect(id){
    let url = '/admin/api/user';
    if(id){
      url += '/' + id;
    }
    let req = superagent.get(url);
    return firekylin.request(req).then(data => {
      this.trigger(data, id ? 'getUserInfo' : 'getUserList');
    }).catch(err => {
      
    })
  },
  /**
   * save user
   * @param  {Object} data []
   * @return {Promise}      []
   */
  onSave(data){
    let id = data.id;
    delete data.id;
    let url = '/admin/api/user';
    if(id){
      url += '/' + id + '?method=put';
    }
    let req = superagent.post(url);
    req.type('form').send(data);
    return firekylin.request(req).then(data => {
      this.trigger(data, 'saveUserSuccess');
    }).catch(err => {
      this.trigger(err, 'saveUserFail');
    })
  }

})