	
	//Funkcja losująca w której komórce ma być komórka żywa
	function losuj_zywa()
	{
		return Math.floor(Math.random()*627);
	}
	
	//Funckja czyszcząca tablicę 2, czyli przechowującą informację czy komórka jest żywa czy martwa 
	//Ustawiamy stan wszystkich komórek na martwy
	function zer_tab2()
	{
		for(let i=0;i<627;i++)
		{
			tab2[i]=0;
		}	
	}