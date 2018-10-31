import React from 'react';
import { Form, Icon, Input,Select} from 'antd';
import getValidater from "../../common/validate"
const FormItem = Form.Item;


class GeneralForm extends React.Component{
    
    parseFormItemList = (formItemDataList) => {
        const {initialValueMap={}} = this.props
        return Array.from(formItemDataList,formItem => this._parseFormItem(formItem,initialValueMap[formItem.name]));
    }
    _getLocalValidater = (validatername) => {
        const form = this.props.form;
        return (rule,value,callback) => {
            const validater = getValidater(validatername);
            if(value && !validater.validater(value)){
                callback(validater.message);
            }else{
                callback();
            }
        }
    }
    _parseFormItem = (formItemData,initialValue) => {
        return (<FormItem {...(formItemData.formItemLayout||{})} label={formItemData.label}>
                    {this._parseDecorator(formItemData,this._parseFormContent(formItemData),initialValue)}
                </FormItem>)
    }
    _parseFormContent = (formItemData) => {
        switch(formItemData.type){
            case 'select':
                return (<Select disabled={!!formItemData.disabled}>{this._getOptions(formItemData.options)}</Select>)
            default:
                return (<Input disabled={!!formItemData.disabled}></Input>)
        }
    }
    _parseDecorator = (formItemData,formItemContent,initialValue) => {
        const {getFieldDecorator} = this.props.form;
        return getFieldDecorator(
            formItemData.name,
            {rules:[...formItemData.rules,...Array.from(formItemData.validaters||[],(validater)=>this._getLocalValidater(validater))],
            initialValue:initialValue||''
        })(formItemContent)
    }
    _getOptions = (options) => {
        if(!options){
            return [];
        }
        return Array.from(options,option => (<Option value={option.className}>{option.name}</Option>))
    }
    render() {
        const{formItemDataList,layout,onSubmit=()=>{}} = this.props;
        return (
            <Form layout={layout} onSubmit={onSubmit}>
                {this.parseFormItemList(formItemDataList)}
            </Form>
        );
    }
}
const WrapGeneralForm = Form.create({})(GeneralForm);
export default WrapGeneralForm;