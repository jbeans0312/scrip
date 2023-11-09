var glitter = 0; // need to change this to call from database
var rubber = 0;
var needle = 0;

var glitter_factory_count = 0; //generates glitter passively
var glitter_shredder_count = 0; //turns needles into glitter (toggle on)
var glitter_bomb_count = 0; //consumes rubber and glitter to make a glitter bomb

var rubber_tree_count = 0; //increases rubber per click
var tree_tap_count = 0; //allows rubber trees to give passive income
var tire_count = 0; //consumes needles and glitter to make a tire

var needle_cutter = 0; //generates bursts of needles at intervals
var hay_count = 0; //spend glitter to generate hay, more hay = greater random chance of needle at interval
var syringe_count = 0; //spend needles and rubber to make a syringe

/**
 * HELPER FUNCTIONS
 * truncate 
 * toggle_shredder
 */
function truncate(val){
    return(Math.floor(val * 100) / 100);
}

var shredder_on = true;
function toggleShredder(){
    shredder_on = !shredder_on;
}
/**
 * VISIBILITY TOGGLE FUNCTIONS
 * toggleMonitoring
 */
var monitoringHidden = true;
function updateMonitoring(){
    if(monitoringHidden)
    {
        monitoringHidden=false; 
        var mon = document.getElementById("monitor");
        mon.style.visibility='visible';
    }
}
/**
 * updateGlitterAmount
 * updateRubberAmount
 * updateNeedleAmount
 * @param {*} amount 
 * Updates the amount of resources when spent, produced, or delivered.
 */
function updateGlitterAmount(amount){
    glitter = glitter + amount;
    document.getElementById("glitter_amount").innerHTML = "G " + truncate(glitter);
}
function updateRubberAmount(amount){
    rubber = rubber + amount;
    document.getElementById("rubber_amount").innerHTML = "R " + truncate(rubber);
}

function updateNeedleAmount(amount){
    needle = needle + amount;
    document.getElementById("needle_amount").innerHTML = "N " + truncate(needle);
}

/**
 * buyGlitterFactory
 * buyGlitterShredder
 * buyRubberTree
 * buyTreeTap
 * buyNeedleCutter
 * buyHay
 * @param {*} amount 
 * Buy functions for production factories and their enhancments
 */
function buyGlitterFactory(amount){
    if(glitter >= 20*amount){
        glitter_factory_count = glitter_factory_count + amount;
        glitter = glitter - 20*amount;
        document.getElementById("glitter_factory_amount").innerHTML = glitter_factory_count;
        document.getElementById("glitter_amount").innerHTML = "G " + glitter;
        updateMonitoring();
    }
}

function buyGlitterShredder(amount){
    if(glitter >= 500*amount){
        glitter_shredder_count = glitter_shredder_count + amount;
        glitter = glitter - 500*amount;
        document.getElementById("glitter_shredder_amount").innerHTML = glitter_shredder_count;
        document.getElementById("glitter_amount").innerHTML = "G " + glitter;
        updateMonitoring();
    }
}

function sellGlitterFactory(amount){
    if ((glitter_factory_count - amount) >= 0){
        glitter_factory_count = glitter_factory_count - amount;
        glitter = glitter + 10 * amount;
    }else{
        glitter = glitter + glitter_factory_count * 10;
        glitter_factory_count = 0;
    }
    document.getElementById("glitter_factory_amount").innerHTML = "G factories " + glitter_factory_count;
}




/**
 * GLITTER INTERVAL
 * Glitter Factory + glitter
 * Glitter Shredder + glitter - needle
 */
setInterval(function(){
    updateGlitterAmount(truncate(glitter_factory_count * 0.0125)); // glitter factory
    if(shredder_on && needle >= glitter_shredder_count*5){
        updateGlitterAmount(glitter_shredder_count * 1); // glitter shredder
        updateNeedleAmount(-glitter_shredder_count * 5)
    }
    if(glitter_factory_count > 0 || glitter_shredder_count > 0){move();}
}, 1000);

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("factory_bar");
    var width = 1;
    var id = setInterval(frame, 5);
    // eslint-disable-next-line no-inner-declarations
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
} 