//written by Ben D
//api credits: 
const widget = await buildWidget();
Script.setWidget(widget);

widget.presentLarge();

async function buildWidget() {
    let widget = new ListWidget();
    widget.setPadding(15,10,10,10)
    
    const bgColor = new LinearGradient();
    bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
    widget.backgroundGradient = bgColor;
    
    const vstack = widget.addStack();
    vstack.layoutVertically();
    
    const header =  vstack.addText("🔔🚨 News 🚨🔔");    
    header.font = Font.mediumRoundedSystemFont(11); 
    header.textColor = Color.white();	
    
    vstack.addSpacer();
    
    const hstack = widget.addStack();
    hstack.layoutVertically();
    
    widget = createArticel(widget, load_data(2) );

    
    return widget;
}

async function createArticel(widget, data){
    
    //styling 
    const hstack = widget.addStack();
    hstack.layoutVertically();
    
            
    const img = hstack.addImage(await load_img(data.image));
    img.cornerRadius = 5;
    img.imageSize = new Size(85,48)
    
    return widget;
}


async function load_data(n) {
    const keywords = ["WEB.DE News","Business Insider Deutschland","Tichys Einblick", ""]
    
    const key = "04e98a94bb0d0734dee9eb90e9727d97";
    const url = "https://gnews.io/api/v4/top-headlines?category=world&lang=de&country=de&min=15&apikey="+key;
    const response = new Request(url);
    const raw_data = await response.loadJSON();
    for (let n in keywords) {
        for (let elem in raw_data.articles) {
            if (raw_data.articles[elem].source.name == keywords[n]) {
                delete (raw_data.articles[elem]);
            }
        }

    }
    console.log(raw_data);
    while (true) {
    	if (raw_data.articles[n] == undefined || raw_data.articles[n] == null) {
        	n++;
    	} else {
            return raw_data.articles[n];
        } 
    }
}      

async function load_img(url) {
    return await new Request(url).loadImage();
}