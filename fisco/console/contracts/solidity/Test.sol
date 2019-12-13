pragma solidity ^0.4.24;

contract Test{
    uint value;

    constructor() public{
       value = 0;
    }

    function get() constant public returns(uint){
        return value;
    }

    function set(uint n) public{
    	value = n;
    }

    function cal() public{
	for(uint i = 0; i < 10; i++){
	    if(i%2==0)
		value++;	
	}
    }
}
