Array.prototype.inArray = function(e)
{
    for(i=0;i<this.length;i++)
    {
        if(this[i] == e)
            return true;
    }
    return false;
}