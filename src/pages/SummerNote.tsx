import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

export default function SummernoteEditor() {
  return (
    <div>
       <SunEditor 
       lang="en"
       width="100%"
       height="70vh"
       autoFocus={true}
      defaultValue="form "
       />
      
    </div>
  )
}
