import * as React from "react";
import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
import { TitleBar, FilterPanel, WidgetWrapper } from "uxp/components";
import './styles.scss';

interface IWidgetProps {
    uxpContext?: IContextProvider
    code:string;
}
let entityEncode = (s:string) => {
    return s.replace('/','&#47;');
}
let generateEmbedCode = (url:string) =>{
    let u = new URL(url);
    let path = u.pathname;
    let bits = path.split('/');
    let siteRoot = bits.slice(0,3).join('/');
    let name = bits.slice(4).join('/');
    let code = `<div class='tableauPlaceholder' style='width: 100%; height: 100%;'>
    <object class='tableauViz' width='100%' height='100%' style='display:none;'>
        <param name='host_url' value='${encodeURIComponent(u.origin + '/')}' /> 
        <param name='embed_code_version' value='3' /> 
        <param name='site_root' value='${entityEncode(siteRoot)}' />
        <param name='name' value='${entityEncode(name)}' />
        <param name='tabs' value='no' />
        <param name='toolbar' value='no' />
        <param name='display_count' value='n' />
        <param name='origin' value='viz_share_link' />
        <param name='showAppBanner' value='false' />
    </object>
</div>`;
return code;
}
const TableauWidget: React.FunctionComponent<IWidgetProps> = (props) => {

    let html = generateEmbedCode(props.code);//" <script type='text/javascript' src='https://prod-apnortheast-a.online.tableau.com/javascripts/api/viz_v1.js'></script><div class='tableauPlaceholder' style='position:absolute;width: 100%; height: 100%;'><object class='tableauViz' width='100%' height='100%' style='display:none;'><param name='host_url' value='https%3A%2F%2Fprod-apnortheast-a.online.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='&#47;t&#47;lucy' /><param name='name' value='Book1&#47;Sheet1' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>";
    console.log(html);
    React.useEffect(()=>{
        const script = document.createElement("script");

        script.src = "https://prod-apnortheast-a.online.tableau.com/javascripts/api/viz_v1.js";
        script.async = true;
    
        document.body.appendChild(script);
    },[])
    return (
        <WidgetWrapper>
            <TitleBar title='Tableau Widget'>
              
            </TitleBar>
            
            <div style={{position:'absolute',width:'100%',height:'100%',left:'0px',top:'0px'}} dangerouslySetInnerHTML={{__html:html}}>

            </div>
        </WidgetWrapper>
    )
};

/**
 * Register as a Widget
 */
registerWidget({
    id: "tableau",
    name: "Tableau",
    widget: TableauWidget,
   
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        },
        props: [
            {
                name: "code",
                label: "Widget Link",
                type: "string"
            }
        ]
    }
});

/**
 * Register as a Sidebar Link
 */
/*
registerLink({
    id: "tableau",
    label: "Tableau",
    // click: () => alert("Hello"),
    component: TableauWidget
});
*/

/**
 * Register as a UI
 */

 /*
registerUI({
    id:"tableau",
    component: TableauWidget
});
*/