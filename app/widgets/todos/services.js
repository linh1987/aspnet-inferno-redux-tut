import request from '../../utils/request';

export const getTodos = () => {
    return request('http://localhost:5000/api/todos');
}