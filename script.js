window.addEventListener('load', () => {

// Change the top text in the memebox from the toptext input.
    function topTextChanged(){
        if(this.value !== "") {
            tText.innerText = this.value;
        } else {
            tText.innerText = "TOP TEXT";
        }
    }

// Change the bottom text in the memebox from the bottomtext input.
    function bottomTextChanged(){
        if(this.value !== "") {
            bText.innerText = this.value;
        } else {
            bText.innerText = "BOTTOM TEXT";
        }
    }

// Change the top text color from the colorpicker
    function topColorChanged(){
        tText.style.color = this.value;
    }

// Change the bottom text color from the colorpicker
    function bottomColorChanged(){
        bText.style.color = this.value;
    }

// Change the top text font size
    function updateh2topfontsize() {
        tText.style.fontSize = this.value+"px";
    }

// Change the bottom text font size
    function updateh2bottomfontsize() {
        bText.style.fontSize = this.value+"px";
    }

// Change the top text font family
    function updateh2topfamily() {
        var family = tSelector.options[tSelector.selectedIndex].value;
        tText.style.fontFamily = family;
    }

// Change the bottom text font family
    function updateh2bottomfamily() {
        var family = bSelector.options[bSelector.selectedIndex].value;
        bText.style.fontFamily = family;        
    }

// Constants for methods above
    const tText = document.getElementById('toptext');
    const bText = document.getElementById('bottomtext');
    
// Change fontfamily on text
    const tSelector  = document.getElementById('selecth2topFontFamily');
    const bSelector = document.getElementById('selecth2bottomFontFamily');
    tSelector.addEventListener('change', updateh2topfamily);
    bSelector.addEventListener('change', updateh2bottomfamily);

// Change fontsize on text
    const topfontsizeselector  = document.getElementById('selecth2topfontsize');
    const bottomfontsizeselector  = document.getElementById('selecth2bottomfontsize');
    topfontsizeselector.addEventListener('change', updateh2topfontsize);
    bottomfontsizeselector.addEventListener('change', updateh2bottomfontsize);

// Change input on text
    const tTextInput = document.getElementById('toptextinput');
    const bTextInput = document.getElementById('bottomtextinput');
    tTextInput.addEventListener('keyup', topTextChanged);
    bTextInput.addEventListener('keyup', bottomTextChanged);

// Change color on text
    const tColor = document.getElementById('topcolor');
    const bColor = document.getElementById('bottomcolor');
    tColor.addEventListener('change', topColorChanged);
    bColor.addEventListener('change', bottomColorChanged);
    
// Preview picture
    const inputfile = document.getElementById('fileupload');
    const choosePic = document.getElementById('choosePic');
    const middletext = document.getElementById('middletext');
    const preview = document.getElementById('meme');

    choosePic.addEventListener('click', function() {
        inputfile.click();
    })

    inputfile.addEventListener('change', function() {
        const file = this.files[0];

        if(file) {
            const reader = new FileReader();

            middletext.style.display = "none"

            reader.addEventListener('load', function() {
                preview.style.background = 'url(' + this.result + ')'
                preview.style.backgroundSize = '100% 100%'
                preview.style.backgroundPosition = 'center'
            });

            reader.readAsDataURL(file);
        }
    });

    dragElement(document.getElementById("toptext"));
    dragElement(document.getElementById("bottomtext"));
    
// Make text inside the meme box draggable
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});