import React, {useRef, useReducer, useMemo, useCallback, createContext } from 'react';
import produce from 'immer';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username:'',
    email:'',
  },
  users:[
    {
      id:1,
      username:'velopert',
      email:'public.velopert@gmail.com',
      active:true,
    },
    {
      id:2,
      username:'tester',
      email:'public.tester@gmail.com',
      active:false,
    },
    {
      id:3,
      username:'tester2',
      email:'public.tester2@gmail.com',
      active:false,
    },
  ]
}

function reducer(state, action){
  switch(action.type){
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs:{
          ...state.inputs,
          [action.name]:action.value
        }
      };
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user);
      })
      /* return{
        inputs:initialState.inputs,
        users:state.users.concat(action.user)
      }; */
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      })
      /* return{
        ...state,
        users:state.users.map(user =>
          user.id === action.id
          ? { ...user, active: !user.active }
          : user
          )
      }; */
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      })
      /* return{
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }; */
    default:
      throw new Error('Unhandled action');
  }
};

export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {users} = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수  : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;