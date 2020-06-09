import React  from 'react';
import { Table, Button, Modal, Form, Input, Checkbox  } from 'antd';
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




const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};



class Home extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };



  onFinish = values =>  {
    console.log('Success:', values);
  };

 onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };



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
  handleClick (v) {
    
    fetch('/add', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'id=' + v
    }).then(function(response) {
      console.log(response);
    });

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
           <Button type="primary"  onClick={this.showModal}> 添加 </Button>
          <Table columns={columns} dataSource={ data } size="small" /> 
          <ul>
            {items.map(item => (
              <li key={ item.id }>
                {item.name}
                <button  onClick={() => this.handleClick(item.id)}> 删除 </button>
              </li>
              
            ))}
          </ul>

          <Modal
            title="添加数据"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              
          </Modal>

        </div>
      );
    }
  }
}

export default  Home;