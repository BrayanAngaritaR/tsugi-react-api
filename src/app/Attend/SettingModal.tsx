import * as React from 'react';
import {useState,useEffect} from 'react';
import { PageSection,Button,Modal,
    ModalVariant, Form, FormGroup, TextInput, 
    Checkbox, Popover, ActionGroup
 } from '@patternfly/react-core';
 import attendServices from '../../services/attend.services';
import {
  Table,
  TableHeader,
  TableBody,
  textCenter,
} from '@patternfly/react-table';

interface settingprops {
    isModalOpen: boolean,
    setisModalOPen: Function
}
export const SettingModal: React.FC<settingprops> = ({isModalOpen,setisModalOPen}) => {
  
  const [code,setcode]=useState('');
  const [grade,setgrade]=useState('');
  const [ipaddr,setipaddr]=useState('');
  
   useEffect(() => {
     const result = attendServices.GetInstructorData();
    result.then(data => {
      console.log(data);
    })
    .catch(err =>console.log(err))
 }, []);

    const PHPSESSID = _TSUGI.react_token; 
       
   //console.log(data);
   function  submitSetting(){

      // const data = 
      // {
      //    "PHPSESSID": PHPSESSID,
      //    "code": code,
      //    "grade": grade,
      //    "match": ""
      // }

      const form_data = new FormData();

      form_data.append("PHPSESSID", PHPSESSID);
      form_data.append("code", code);
      form_data.append("grade", grade);
      form_data.append("match", "");

      setisModalOPen(false);

      const result = attendServices.UpdateSettings(form_data);
   }
   
  
  return (
    <>
  <PageSection>
      <Modal
          variant={ModalVariant.medium}
          title="React Attent Settings"
          isOpen={isModalOpen}
          onClose={()=>setisModalOPen(false)}
          actions={[
            // <Button key="confirm" variant="primary" onClick={()=>setisModalOPen(false)}>
            //   Confirm
            // </Button>,
            // <Button key="cancel" variant="link" onClick={()=>setisModalOPen(false)}>
            //   Cancel
            // </Button>
          ]}
        >
             <Form>
        <FormGroup
          isRequired
          fieldId="simple-form-name-01"
          helperText="Configure the LTI Tool :D"
        >
        </FormGroup>
        <FormGroup
          label="Code"
         
          isRequired
          fieldId="simple-form-name-01"
          helperText=""
        >
          <TextInput
            isRequired
            type="text"
            id="simple-form-name-01"
            name="simple-form-name-01"
            aria-describedby="simple-form-name-01-helper"
            value={code}
            onChange={(e)=>{
              setcode(e)
            }}
          />
        </FormGroup>
        <FormGroup fieldId="checkbox01">
          <Checkbox
            label="Send a Grade"
            id="checkbox01"
            name="checkbox01"
            aria-label="Update via email"
            isChecked={grade === 1 ? true : false}
            onChange={(e)=>{
              console.log(e)
              setgrade(e?1:0)
            }}
          />
        </FormGroup>
        <FormGroup
          label="Limit access by IP address. This can be a prefix of an IP address
           like '142.16.41' or if it starts with a '/' it can be a regular expression (PHP syntax)"
         
          isRequired
          fieldId="simple-form-name-01"
          helperText="Your current IP address is ::1"
        >
          <TextInput
            isRequired
            type="text"
            id="simple-form-name-01"
            name="simple-form-name-01"
            aria-describedby="simple-form-name-01-helper"
            value={ipaddr}
            onChange={(e)=>setipaddr(e)}
          />
        </FormGroup>
        <ActionGroup>
          <Button variant="primary" onClick={submitSetting}>Submit form</Button>
          <Button variant="link" onClick={()=>setisModalOPen(false)}>Cancel</Button>
        </ActionGroup>
      </Form>
        </Modal>
  </PageSection>
  </>
)
  }

