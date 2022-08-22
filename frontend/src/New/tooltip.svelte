<script>
    let active= false;
    </script>
    <div class="box">
        <slot name="name"></slot> <button class:active={active} class="hastooltip" on:click={()=>{active=!active}}>?</button>
        <div class:active={active} class="container">
            <div class="content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
    
    <style>
        button{
            opacity:0.8;
            border:0px;
        }
        button.active{
            opacity:1;
        }
        button:active{
            opacity:0.5;
            background:var(--header-bg);
        }
        .container {
            width: 300px;
            border-radius: 2px;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
            max-height:0px;
            box-sizing:border-box;
            overflow:hidden;
            opacity:0;
            transition:all .3s;
        }
        .content{
            padding:15px;
            background: var(--header-bg);
            color: var(--header-color);
            font-size: 12px;
        }
        
        .container.active{
            max-height:500px;
            opacity:1;
        }
        
        
                .hastooltip {
                /* background: var(--); */
                content:"?";
                display:inline-block;
                background: var(--header-bg);
                color: var(--header-color);
                font-size: 10px;
                width: 28px;
                text-align: center;
                border-radius: 20px;
                margin-left: 6px;
                font-weight: bold;
                cursor: help;
                min-width: auto;
                padding: 0;
                }
    
    </style>