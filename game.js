//Skrypt zawiera funkcję uniwersalne, których można użyć na dowolnej planszy



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
	
	//Funkcja zerująca ilość cykli danej komórki na planszy
	function zer_tab4()
	{
		for(let i=0;i<627;i++)
		{
			tab4[i]=0;
		}
	}
	
	
	//Funkcja tworząca divy, czyli plansze
	function tworz_plansza()
	{
		//Liczniki
		const licz=document.querySelector('.licznik');
		const licz_zywe=document.querySelector('.zywe');
		const licz_martwe=document.querySelector('.martwe');
		licz_zywe.innerText="Żywe: "+licznik_zyw;
		licz_martwe.innerText="Martwe: "+licznik_martw;
		licz.innerText="Krok: "+licznik;
		
		//Plansza
		const plansza = document.querySelector('.container');
		for(let i=0;i<627;i++)
		{			
			tab1[i]=document.createElement('div');
			tab1[i].id=i;
			tab1[i].className="komorka";			
			tab1[i].style.backgroundColor="white";
			plansza.appendChild(tab1[i]);
		}
	}
	
//Funkcja która odpowiada za umieranie komórek po 50 cyklach

	function umieraj()
	{
		for(let i=0;i<627;i++)
		{
			if(tab2[i]===1||tab2[i]==2) tab4[i]++;
			else tab4[i]=0;
			
			if(tab4[i]===50)
			{
				tab4[i]=0;
				tab2[i]=0;
			}
		}
	}