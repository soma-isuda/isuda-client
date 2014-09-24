var Audio =
{
    plugin : null
}

Audio.init = function()
{
    var success = true;
   
    this.plugin =  webapis.audiocontrol;
	
    if (!this.plugin)
    {
        success = false;
    }

    return success;
}

Audio.setRelativeVolume = function(delta)
{
	alert(delta);
	if(delta==0){
		this.plugin.setVolumeUp(1);
	}else{

		this.plugin.setVolumeDown(1);
	}
    
    Display.setVolume( this.getVolume() );

}

Audio.getVolume = function()
{
    alert("Volume : " +  this.plugin.getVolume());
    return this.plugin.getVolume();
}