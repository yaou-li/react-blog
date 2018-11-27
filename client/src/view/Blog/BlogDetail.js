import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider, PlaceHolder } from '../../common';
import showdown from 'showdown';
import './Blog.css';


class BlogDetail extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    
    createMarkup() {
        let converter = new showdown.Converter();
        let text      = "[TOC]\n# Set up\n- [Download from here](https://nsis.sourceforge.io/Download)\n- It's able to run on windows **ONLY**\n- Open the script from the test compiler after installed\n# Command\n## DetailPrint\n- the most useful logging function, will print the message in 'show detail' area\n```nsis\nDetailPrint 'this is just test $0'\n```\n## Push & Pop & Exch\n- there is a inner stack keep by the program you can easily push & pull data from.\n- Exch will switch the top of stack and given variable\n```nsis\n; push val in $0 to the top of stack\nPush $0\n; pop val from top and assign to $1\nPop $1\n; exch will exchange the data of top stack with $0\nExch $0\n```\n**notice: [pop,push,exch doc](https://nsis.sourceforge.io/Pop,_Push,_Exch..._The_Stack#4.9.9.1_Exch)**\n## Call\n- will call the function defined in the same page, **but can not pass params**\n```nsis\n; example of passing params to function call\nSection ''\nPush 'test message'\nCall test\nPop $0\nSection\nFunction test\nExch $0\nDetailPrint $0\nPush $0\nFunctionEnd\n```\n## StrCpy\n- there is **no '='** operator in nsis. the only way to assign variable is StrCpy\n```nsis\nStrCpy $0 'test message'\nDetailPrint $0 ;test message\n```\n## RMDir\n- remove directory if exists\n```nsis\n; remove the entire services recursively\nRMDir /r 'test\services'\n```\n## Delete\n- delete file if exists\n```nsis\n; remove the file\nDelete 'test\services\example'\n```\n## CopyFiles\n- copy files recursively if exists\n```nsis\n; copy the entire test folder into $INSTDIR\nCopyFiles /SILENT '$0/test' $INSTDIR\n```\n```nsis\n; copy the all the files in test into $INSTDIR\nCopyFiles /SILENT '$0/test/*' $INSTDIR\n```\n## FileOpen & FileRead & FileWrite\n- file manipulation functions, used with $ variable\n```nsis\n; open file for read and save the file pointer to $4\nFileOpen $4 '$EXEDIR\test' r\n; read one line to $0\nFileRead $4 $0\nFileClose $4\n```\n```nsis\n; open file for write and save the file pointer to $4\nFileOpen $4 '$EXEDIR\test' w\n; write text\nFileWrite $4 'test message'\nFileClose $4\n```\n**notice:**\n- the line read from file will contains a **'\r\n'** in the end\n## ConfigRead\n- read config data from config file\n```nsis\n; ConfigRead is defined in TextFunc\ninclude 'TextFunc.nsh'\n; Read command setting from $0 and save it in $Model\nVar Model\n${ConfigRead} $0 'set COMMAND=%COMMAND% -mgf.feature_model=' $Model\n```\n**notice:**\n- use **'$\\'** for escaping special character\n- [ConfigRead doc](https://nsis.sourceforge.io/ConfigRead)\n## Exec\n- nsExec will execute command-line based programs and capture the output\n```nsis\n; exec command\nnsExec::ExecToLog 'cmd /C 'cd $INSTDIR & .\manage.exe start''\nPop $0 ; return val\n```\n```nsis\n; exec command and print the out to detail\nnsExec::ExecToLog 'cmd /C 'cd $INSTDIR & .\manage.exe start''\nPop $0 ; return val\n```\n```nsis\n; exec command and save the output to second param on stack\nnsExec::ExecToLog 'cmd /C 'cd $INSTDIR & .\manage.exe start''\nPop $0 ; return val\nPop $1 ;output\n```\n**notice:**\n- [Exe Doc](https://nsis.sourceforge.io/Docs/nsExec/nsExec.txt)\n## MessageBox\n- message box can send alert/prompt message as wish\n```nsis\n; alert message with only ok button\nMessageBox MB_OK `'$INSTDIR' does not exist. Please install the product first.`\n```\n```nsis\n; prompt message to give user option\nMessageBox MB_YESNO|MB_ICONQUESTION `Upgrades will finish in 1 minute, click Y to conitnue.` IDYES end\nQuit\nend:\n```\n**notice:**\n- [MessageBox Doc](http://nsis.sourceforge.net/Reference/MessageBox)\n## More Commands\n- [User Manual](https://nsis.sourceforge.io/Docs/Contents.html)\n- [Scripting Reference](https://nsis.sourceforge.io/Docs/Chapter4.html#4.9.4.17)\n- [Explode](https://nsis.sourceforge.io/Explode)\n- [StrCmp](https://nsis.sourceforge.io/Reference/StrCmp)\n- [Macro VS Function](https://nsis.sourceforge.io/Macro_vs_Function)\n- [LogicLib](https://nsis.sourceforge.io/LogicLib)";
        let html      = converter.makeHtml(text);  
        return {__html: html};
    }

    render() {
        return (
            <div className='detail'>
                <div className='title'>Nginx的二三事</div>
                <div className='desc'>Nginx的二三事</div>
                <div className='content'>
                    <div className='subtitle'>配置文件</div>
                    <Divider height='3px'/>
                    <PlaceHolder height='10px' />
                    <div className='text'>通过nginx -t不光可以校验配置文件是否有语法错误，并且可以找到生效的nginx配置文件路径</div>
                    <pre>
                        <div>$sudo nginx -t</div>
                        <div>nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok</div>
                        <div>nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful</div>
                    </pre>
                    <div dangerouslySetInnerHTML={this.createMarkup()} />
                </div>
            </div>
        )
    }
}

export default BlogDetail;