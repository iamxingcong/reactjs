import React  from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
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
 
    fetch("/adds", {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
        body: 'name=' + values.name + '&url=' + values.url + '&alexa=' + values.alexa + '&country=' + values.country
 
      })
      .then((response)=>response.json())
      .then((responseJsonData)=>{
        this.setState({
          visible: false,
        });
        this.getAll()
        console.log(responseJsonData);
      })
      .catch((error)=>{
        alert(error);
      })
  };

 onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  getAll = () => {
    fetch("/getall")
    
    .then(res => res.json())
    .then((r) => {
          data = []

          for (var i = 0; i < r.length; i++) {
            r[i].key = i
            data.push( r[i] )
          }
          
          this.setState({
            isLoaded: true,
            items: r
          });
   
      })
      .catch((error) => {
        console.log('错误了')
        this.setState({
          isLoaded: true,
          error
        });
      })
  }

  componentDidMount() {
  
    this.getAll()
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      console.log(this.state)
      return
    }
  }
  handleClick (v) {
    var that = this
    fetch('/del', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'id=' + v
    }).then(function(response) {
      console.log(response);
      that.getAll()
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
            footer={null}
          >
            
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="name"
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="url"
                  name="url"
                  rules={[{ required: true, message: 'Please input your url!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="alexa"
                  name="alexa"
                  rules={[{ required: true, message: 'Please input your alexa!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="country"
                  name="country"
                  rules={[{ required: true, message: 'Please input your country!' }]}
                >
                  <Input />
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