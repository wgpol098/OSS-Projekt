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
	
	//Funkcja czyszcząca tablicę 4, która przechowuje informację ile cykli komórka jest żywa
	//Ustawiamy stan wszystkich elementów na 0
	function zer_tab4()
	{
		for(let i=0;i<627;i++)
		{
			tab4[i]=0;
		}
	}
	
	//Funckja czyszcząca tablicę 5, która przechowuje informację o tym ile cykli komórka była żywa
	//Ustawiamy stan wszystkich elementów na 0
	function zer_tab5()
	{
		for(let i=0;i<627;i++)
		{
			tab5[i]=0;
		}
	}
	
	//Funkcja tworząca elementy div, czyli planszę 
	function tworz_plansza()
	{
		//Przypisanie divów, które zawierają informację dotyczące planszy do stałych
		const licz=document.querySelector('.licznik');
		const licz_zywe=document.querySelector('.zywe');
		const licz_martwe=document.querySelector('.martwe');
		const licz_srednia=document.querySelector('.srednia');
		licz_zywe.innerText="Żywe: "+licznik_zyw; //Ustawiamy ile komórek jest żywych, czyli 0
		licz_martwe.innerText="Martwe: "+licznik_martw; //Ustawiamy ile komórek jest martwych, czyli 627
		licz.innerText="Krok: "+licznik; //Ustawiamy który jest aktualnie krok, czyli 0
		licz_srednia.innerText="Średnia: 0"; //Ustawiamy średnią długość, życia komórki na 0
		
		//Przypisanie diva o klasie container do zmiennej plansza
		//W tym momencie tworzona jest plansza
		const plansza = document.querySelector('.container')
		for(let i=0;i<627;i++)
		{			
			tab1[i]=document.createElement('div'); //Tworzymy nowy element div, który jest elementem tablicy
			tab1[i].id=i; //Nowemu elementowi w tablicy przypisujemy id odpowiadające aktualnie zmiennej "i"
			tab1[i].className="komorka"; //Nowemu elementowi przypisujemy klasę "komorka"
			tab1[i].style.backgroundColor="white"; //Ustawiamy kolor nowego diva na 0, czyli komórka będzie martwa
			plansza.appendChild(tab1[i]); //Dodajemy element do dokumentu
		}
	}
	
	//Funkcja która odpowiada za umieranie komórek po 50 cyklach
	function umieraj()
	{
		for(let i=0;i<627;i++)
		{
			if(tab2[i]!==0) tab4[i]++; //Jeżeli komórka nie jest martwa, to dodaj 1 w liczniku cykli życia komórki
			else tab4[i]=0; //Jeśli komórka jest martwa to licznik cykli ustaw na 0
			
			if(tab4[i]===50) //Jeśli dana komórka żyje już 50 cykli 
			{
				tab4[i]=0; //Licznik cykli ustaw na 0
				tab2[i]=0; //Stan komórki ustaw na martwą 
			}
		}
	}
	
	//Funkcja licząca ile cykli komórka była żywa
	function dl_zycia()
	{
		for(let i=0;i<627;i++)
		{
			if(tab2[i]!=0) tab5[i]++; //Jeśli komórka jest żywa do licznik tego ile dana komórka była żywa zwiększ o 1
		}
	}

	//Funkcja licząca srednią długość życia komórki
	//Funkcja zwraca średnią długość życia danej komórki
	function sr_dl_zycia()
	{
		let srednia=0; //Deklaracja i ustawienie zmiennej średnia na 0
		for(let i=0;i<627;i++)
		{
			srednia+=tab5[i]; //Liczymy ile cykli żyły łącznie wszystkie komórki
		}
		return parseInt(Math.floor(srednia/627)); //Zwracamy średnią długość życia danej komórki
	}
	
	//Funkcja sprawdzająca czy są jeszcze jakieś żywe komórki
	//Wszystkie martwe zwraca 0
	//Jeste jakaś żywa zwraca 1
	function czy_zywe()
	{
		for(let i=0;i<627;i++)
		{
			if(tab2[i]!=0) return 0;
		}
		return 1;
	}