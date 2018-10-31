import { Table,Divider,Button,Popconfirm,Modal} from 'antd';
import React from 'react';
import GeneralModalForm from '../../component/GeneralModarForm/GeneralModalForm';
const itemLayout = {
    labelCol: { span:  7},
    wrapperCol: { span: 14},
};
const addFormProps = {
    formItemDataList:[
        {label:"任务名",rules:[{required:true,"message":"任务名不能为空"}],name:"name",type:"input",disabled:false,formItemLayout:itemLayout},
        {label:"工作组名",rules:[{required:true,"message":"工作组任务名不能为空"}],name:"group",type:"input",disabled:false,formItemLayout:itemLayout},
        {label:"时间表达式",rules:[{required:true,"message":"时间表达式任务名不能为空"}],name:"cronExpress",type:"input",disabled:false,formItemLayout:itemLayout},
        {label:"工作类",rules:[{required:true,"message":"任务内容不能为空"}],name:"jobClass",type:"select",disabled:false,formItemLayout:itemLayout},
        {label:"任务内容",rules:[{required:true,"message":"任务内容不能为空"}],name:"description",type:"input",disabled:false,formItemLayout:itemLayout} 
    ],
    layout:'horizontal'
}
const updateFormProps = {
    formItemDataList:[
        {label:"任务名",rules:[{required:true,"message":"任务名不能为空"}],name:"name",type:"input",disabled:true,formItemLayout:itemLayout},
        {label:"工作组名",rules:[{required:true,"message":"工作组任务名不能为空"}],name:"group",type:"input",disabled:true,formItemLayout:itemLayout},
        {label:"时间表达式",rules:[{required:true,"message":"时间表达式任务名不能为空"}],name:"cronExpress",type:"input",disabled:false,formItemLayout:itemLayout},
        {label:"工作类",rules:[{required:true,"message":"任务内容不能为空"}],name:"jobClass",type:"select",disabled:true,formItemLayout:itemLayout},
        {label:"任务内容",rules:[{required:true,"message":"任务内容不能为空"}],name:"description",type:"input",disabled:true,formItemLayout:itemLayout} 
    ],
    layout:'horizontal'
}

export default class JobList extends React.Component {
    saveUpdateFormRef = (formRef) => {
        this.updateFormRef = formRef;
    }
    saveAddFormRef = (formRef) => {
        this.addFormRef = formRef;
    }
    state = {
        tableDate: [],
        loading: false,
        addFormVisible: false,
        updateFormVisible: false,
        addFormProps:Object.assign(addFormProps,{wrappedComponentRef:this.saveAddFormRef}),
        updateFormProps:Object.assign(updateFormProps,{wrappedComponentRef:this.saveUpdateFormRef})
    };
    fetchOption = () => {
        fetch("/work/get",{}).then(response => response.json()).then(json =>{
            addFormProps.formItemDataList[3]['options'] = json;
            updateFormProps.formItemDataList[3]['options'] = json;
            console.log(updateFormProps)
            this.setState({addFormProps:addFormProps,updateFormProps:updateFormProps})
        })
    }
    toggleAddForm = () => {
        this.setState({addFormVisible:!this.state.addFormVisible})
    }
    toggleUpdateForm = () => {
        this.setState({updateFormVisible:!this.state.updateFormVisible});
    }
    constructor(props){
        super(props)
        this.columns = [{
            title: '任务名称',
            dataIndex: 'name',
            },{
                title: '组名',
                dataIndex: 'group',
            },{
                title: '时间表达式',
                dataIndex: 'cronExpress',
            },{
                title: '工作类',
                dataIndex: 'jobClass',
            },{
                title: '工作内容',
                dataIndex: 'description',
            },{
                title: '状态',
                dataIndex: 'status',
            },{
                title: '操作',
                key: 'action',
                render: (text,record) => {
                    const params = {name:record.name,group:record.group};
                    return (
                        <span>
                            <GeneralModalForm
                                formProps={Object.assign(this.state.updateFormProps,{initialValueMap:record})}
                                buttonOnClick={this.toggleUpdateForm}
                                modalProps={{
                                    title: "修改任务",
                                    visible: this.state.updateFormVisible,
                                    okText: "确定",
                                    cancelText: "取消",
                                    onOk:this.handleUpdate,
                                    onCancel:this.handleCancer
                                }}
                                buttonText="修改任务"
                            />
                            <Divider type="vertical" />
                            <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(params)}>
                                <span><Button type="primary">删除</Button></span>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <span><Button type="primary" onClick={()=>this.handlePauseResume(params,record.status)}>{record.status == "NORMAL"?"暂停":"启动"}</Button></span>
                        </span>)
                    }
            }]; 
    }
    optSuccess = (title,content) => {
        Modal.success({
            title: title,
            content: content,
        });
    }
    handleDelete = (param) => {
        this.optJob("/task/delete","DELETE",param);
    }
    handleUpdate = () =>{
        const form = this.updateFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
              return;
            }
            fetch("/task/update",{
                method:"POST",
                headers: new Headers({
                  'Content-Type': 'application/json',
                }),
                body:JSON.stringify(values)
              }).then(response=>{
                  if(response.ok){
                    form.resetFields();
                    this.handleCancer();
                    this.fetchTableData();
                  }else{
                    this.optSuccess("失败","修改任务失败")
                  }
            });
        })
    }
    handleAdd = () => {
        const form = this.addFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
              return;
            }
            fetch("/task/add",{
                method:"POST",
                headers: new Headers({
                  'Content-Type': 'application/json',
                }),
                body:JSON.stringify(values)
              }).then(response=>{
                if(response.ok){
                    form.resetFields();
                    this.handleCancer();
                    this.fetchTableData();
                }else{
                    this.optSuccess("失败","新增任务失败")
                }
            });
        })
    }
    handleCancer = () =>{
        this.setState({updateFormVisible:false,addFormVisible:false})
    }
    handlePauseResume = (param,status) => {
        if(status == "NORMAL"){
            this.handlePause(param);
        }else{
            this.handleResume(param);
        }
    }
    handleResume = (param) =>{
        this.optJob("/task/resume","PATCH",param);
    }
    handlePause = (param) =>{
        this.optJob("/task/pause","PATCH",param);
    }
    componentDidMount() {
        this.fetchTableData(); 
        this.fetchOption();
    }
    fetchTableData = (params={}) =>{
        fetch("/task/get",params).then(response =>{
            response.json().then(json => {
                this.setState({data:json})
            })
        }); 
    }
    optJob = (url,method,params={}) =>{
        fetch(url,{
            method:method,
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(params)
        }).then(response => {
            if(response.ok){
                this.fetchData(); 
                this.optSuccess("操作提示","操作成功")
            }else{
                this.optSuccess("操作提示","操作失败")
            }
        })
    }
    render() {
        
        return (
            <div>
                <GeneralModalForm
                    formProps={this.state.addFormProps}
                    buttonOnClick={this.toggleAddForm}
                    modalProps={{
                        title: "新增任务",
                        visible: this.state.addFormVisible,
                        okText: "确定",
                        cancelText: "取消",
                        onOk:this.handleAdd,
                        onCancel:this.handleCancer
                    }}
                    buttonOnClick={this.toggleAddForm}
                    buttonText="新增任务"
                />
                <Table
                    columns={this.columns}
                    dataSource={this.state.data}
                    style={{marginTop:"10px"}}
                />
            </div>
        );
    }
}
