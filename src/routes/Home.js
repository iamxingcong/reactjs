import React  from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: '音乐名称',
    dataIndex: 'name',
    key: 'id'
  },
  {
    title: 'alexa',
    dataIndex: 'alexa',
    key: 'id'
  },
  {
    title: 'url',
    dataIndex: 'url',
    key: 'id'
  }
];
var data = []
class Home extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
  
      fetch("/getall")
    
      .then(res => res.json())
      .then(
        
        (r) => {
            for (var i = 0; i < r.length; i++) {
              r[i].key = i
              data.push( r[i] )
            }
            
            this.setState({
              isLoaded: true,
              items: r
            });
     
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('错误了')
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      console.log(this.state)
      return
    }
  }
 
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <Table columns={columns} dataSource={ data } size="small" /> 
         <ul>
          {items.map(item => (
            <li key={ item.id }>
              {item.name}
            </li>
          ))}
        </ul> 
        </div>
      );
    }
  }
}

 
export default  Home;