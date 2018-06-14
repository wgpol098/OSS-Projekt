 //Przypisanie do stałych "buttonów" - START, STOP, RESET
 const start = document.getElementById('start');
 const stop = document.getElementById('stop');
 const res = document.getElementById('reset');
 let k=0;  //Zmienna przechowuje wartości i dzięki niej po wciśnięciu przycisku STOP zmienia on napis na WZNÓW i odwrotnie
 //Tablice kolejno - Tablica divów z komórkami - Tablica zawierająca aktualny stan komórki - Tablica do przechowywania stanu komórki tmp - Licznik cykli
 let tab1=[],tab2=[],tab3=[],tab4=[],tab5=[];
 let licznik=0;  //Deklaracja licznika cykli
 let licznik_zyw=0; //Deklaracja licznika żywych elementów
 let licznik_martw=627; //Deklaracja licznika martwych elementów 
 let Intgra; //Deklaracja zmiennej, która będzie interwałem, który będzie odpowiadał za liczenie, czy dana komórka jest żywa czy martwa
 let Intstan; //Deklaracja zmiennej, która będzie interwałem, który będzie odpowiadał za wyświetlanie aktualnego stanu komórek i wszystkich danych w liczniku 
 let r=0; //Zmienna przechowująca informacje, czy plansza jest uruchamiana po raz pierwszy, czy też restartowana 

	tworz_plansza(); //Wywołanie funkcji tworzącej planszę 
	zer_tab2(); //Wywołanie funkcji zerującej stan komórki
	zer_tab4(); //Wywołanie funkcji zerującej ilość cykli życia komórki
	zer_tab5(); //Wywołanie funkcji zerującej ile cykli żyła dana komórka
	
	document.querySelector(".container").addEventListener("click",dodaj); //Zdarzenie wywoływane po kliknięciu na jakiś div w divie o klasie "container"
	
	//Funkcja zmieniająca stan komórki po kliknięciu na żywy lub martwy
	function dodaj(e)
	{
		//Jeżeli komórka, którą klikneliśmy była martwa to stanie się żywa
		let x=parseInt(e.target.id);
		if(tab2[x]===0)
		{
			if(licznik===0) licznik=-1;
			else licznik--;
			tab2[x]=1;
			akt_stan();
			
		}
		//Jeżeli komórka, którą kliknęliśmy była żywa to staje się martwa
		else
		{
			if(licznik===0) licznik=-1;
			else licznik--;
			tab2[x]=0;
			akt_stan();
		}
	}
	//Funkcja resetująca planszę
	res.onclick=function()
	{
		zer_tab2();
		zer_tab4();
		zer_tab5();
		licznik=-1;
		akt_stan();
		clearInterval(Intgra);
		clearInterval(Intstan);
		start.value="START";
		stop.value="STOP";
		document.getElementById('ilosc').value="";
	}
	//Funkcja która działa po kliknięciu w przycisk start
	start.onclick = function()
	{
		if(document.getElementById('ilosc').value>627)
		{
			alert("PODANO ZA DUŻĄ WARTOŚĆ!");
			return 0;
		}
		if(parseInt(document.getElementById('ilosc').value)<0)
		{
			alert("PODANO ZA MAŁĄ WARTOŚĆ!");
			return 0;
		}
		
		zer_tab5();
		if(r===0)
		{
			start.value="RESTART";
			//Zerowanie licznika
			licznik=0;
			//document.querySelector('.container').innerHTML="";
			//tworz_plansza();
			pocz_zywe();
			//gra();
			clearInterval(Intgra);
			clearInterval(Intstan);
			Intgra = window.setInterval (gra, 100);
			Intstan = window.setInterval (akt_stan, 100);
		
			if(k%2==1)
			{
				stop.value="STOP";
				k++;
			}
			
			r++;
		}
		else
		{
			start.value="RESTART";
			//Zerowanie licznika
			licznik=0;
			//document.querySelector('.container').innerHTML="";
			//tworz_plansza();
			clearInterval(Intgra);
			clearInterval(Intstan);
			zer_tab2();
			gra();
			akt_stan();
			pocz_zywe();
			//gra();
			
			Intgra = window.setInterval (gra, 100);
			Intstan = window.setInterval (akt_stan, 100);
		
			if(k%2==1)
			{
				stop.value="STOP";
				k++;
			}
			
			r++;
		}
	}
	
	//Funkcja która działa po kliknięciu w przycisk stop
	stop.onclick = function()
	{
		if(k%2===0)
		{
			clearInterval(Intgra);
			clearInterval(Intstan);
			stop.value="WZNÓW";
			k++;
		}
		else
		{
			Intgra = window.setInterval (gra, 100);
			Intstan = window.setInterval (akt_stan, 100);
			stop.value="STOP";
			k++;
		}
	}
	
	//Funkcja tworzaca poczatkowe polozenie zywych komorek
	function pocz_zywe()
	{
		let ilosc = document.getElementById('ilosc');
		
		//Dodawanie żywych komórek
		for(let i=0;i<ilosc.value;i++)
		{
			let x = losuj_zywa();
			if(tab2[x]==1) i--;
			else
			{
				tab2[x]=1;
				tab1[x].style.backgroundColor="blue";
			}
		}	
		//Licznik żywych komórek
		licznik_zyw=licznik_zyw+ilosc;
		licznik_martw=licznik_martw-ilosc;
	}
	
	//Funkcja, która wyświetla aktualny stan komórki
	function akt_stan()
	{
		licznik_martw=0; //Licznik martwych komórek ustawiamy na 0
		licznik_zyw=0; //Licznik żywych komórek ustawiamy na 0
		dl_zycia(); //Wywołanie funkcji dodającej wartość 1 do aktualnej sumy, jeśli komórka jest żywa 
		//Ustawianie aktualnego stanu komórek na planszy
		for(let i=0;i<627;i++)
		{
			if(tab2[i]==1) //Jeśli komórka jest żywa to elementowi odpowiadającemu ustaw kolor niebieski i ilość żywych komórek zwiększ o 1
			{
				tab1[i].style.backgroundColor="blue";
				licznik_zyw++;
			}				
			else //Jeśli komórka jest martwa to elementowi odpowiadającemu ustaw kolor biały i licznik martwych zwiększ o 1
			{
				tab1[i].style.backgroundColor="white";
				licznik_martw++;
			}	
			
			if(czy_zywe()==1) //Wywołanie funkcji, która sprawdza, czy na planszy są żywe komórki, jeśli nie ma to czyścimy interwały 
			{
				clearInterval(Intgra);
				clearInterval(Intstan);	
				r=0;
			}			
		}
		//Licznik cyklu zwiększamy o 1
		licznik++;
		//Do stałych przypisujemy odpowiednie elementy z dookumentu HTML, a następnie zmienamy im tekst, by wyświetlały one aktualne dane 
		const licz=document.querySelector('.licznik');
		const licz_martwe=document.querySelector('.martwe');
		const licz_zywe=document.querySelector('.zywe');
		const licz_srednia=document.querySelector('.srednia');
		licz.innerText="Krok "+licznik;
		licz_martwe.innerText="Martwe: "+licznik_martw;
		licz_zywe.innerText="Żywe: "+licznik_zyw;
		licz_srednia.innerText="Średnia: "+sr_dl_zycia();
	}
	
	//Funkcja odpowiedzialna za sprawdzanie stanu komórki w kolejnym cyklu
	function gra()
	{
		//Obliczanie ile żywych komórek sąsiaduje z daną komórką 
		for(let i=0;i<627;i++)
		{
			let zywa=0; //Ustawiamy licznik żywych sąsiadów na 0
			if(i===0) //Jeśli sprawdzana komórka jest w lewym górnym roku
			{
				if(tab2[1]==1) zywa++;
				if(tab2[33]==1) zywa++;
				if(tab2[34]==1) zywa++;
				if(tab2[32]==1) zywa++;
				if(tab2[32+33]==1) zywa++;
				if(tab2[594]==1) zywa++;
				if(tab2[595]==1) zywa++;
				if(tab2[594+32]==1) zywa++;
			}
			else
			{
				if(i==32) //Jeśli sprawdzana komórka jest w prawym górnym rogu
				{
					if(tab2[i-1]==1) zywa++;
					if(tab2[i+33]==1) zywa++;
					if(tab2[i+32]==1) zywa++;
					if(tab2[0]==1) zywa++;
					if(tab2[33]==1) zywa++;
					if(tab2[594]==1) zywa++;
					if(tab2[594+32]==1) zywa++;
					if(tab2[594+31]==1) zywa++;
				}
				else
				{
					if(i==594) //Jeśli sprawdzana komórka jest w prawym dolnym rogu
					{
						if(tab2[i+1]==1) zywa++;
						if(tab2[i-33]==1) zywa++;
						if(tab2[i-32]==1) zywa++;
						if(tab2[0]==1) zywa++;
						if(tab2[i+32]==1) zywa++;
						if(tab2[32]==1) zywa++;
						if(tab2[1]==1) zywa++;
						if(tab2[i-1]==1) zywa++;
					}
					else
					{
						if(i==626) //Jeśli sprwadzana komórka jest w lewym dolnym rogu
						{
							if(tab2[i-1]==1) zywa++;
							if(tab2[i-33]==1) zywa++;
							if(tab2[i-34]==1) zywa++;
							if(tab2[i-32]==1) zywa++;
							if(tab2[i-32-33]==1) zywa++;
							if(tab2[0]==1) zywa++;
							if(tab2[32]==1) zywa++;
							if(tab2[31]==1) zywa++;
						}
						else
						{	
							if(i!==0&&i<32) //Jeśli sprawdzana komórka znajduje się w pierwszym rzędzie od góry
							{
								if(tab2[593+i]==1) zywa++;
								if(tab2[594+i]==1) zywa++;
								if(tab2[595+i]==1) zywa++;
								if(tab2[i-1]==1) zywa++;
								if(tab2[i+1]==1) zywa++;
								if(tab2[i+32]==1) zywa++;
								if(tab2[i+33]==1) zywa++;
								if(tab2[i+34]==1) zywa++;				
							}
							else
							{
								if(i>594) //Jeśli sprawdzana komórka znajduje się w ostatnim rzędzie od góry
								{
									if(tab2[i-34]==1) zywa++;
									if(tab2[i-33]==1) zywa++;
									if(tab2[i-32]==1) zywa++;
									if(tab2[i-1]==1) zywa++;
									if(tab2[i+1]==1) zywa++;
									if(tab2[i%33]==1) zywa++;
									if(tab2[i%33+1]==1) zywa++;
									if(tab2[i%33-1]==1) zywa++;						
								}
								else
								{
									if(i%33==32) //Jeśli sprawdzana komórka znajduje się po prawej stronie planszy
									{
										if(tab2[i-33]==1) zywa++;
										if(tab2[i+33]==1) zywa++;
										if(tab2[i-34]==1) zywa++;
										if(tab2[i+32]==1) zywa++;
										if(tab2[i-1]==1) zywa++;
										if(tab2[i+1]==1) zywa++;
										if(tab2[i-32]==1) zywa++;
										if(tab2[i-32-33]==1) zywa++;
									}
									if(i%33===0) //Jeśli sprawdzana komórka znajduje się po lewej stronie planszy
									{
										if(tab2[i-33]==1) zywa++;
										if(tab2[i+33]==1) zywa++;
										if(tab2[i+34]==1) zywa++;
										if(tab2[i-32]==1) zywa++;
										if(tab2[i+1]==1) zywa++;
										if(tab2[i+32]==1) zywa++;
										if(tab2[i-1]==1) zywa++;
										if(tab2[i+32+33]==1) zywa++;
									}
									//Jeśli sprawdzana komórka nie znajduje się na skraju planszy
									if(i%33!==0&&i%33!=32)
									{
										if(tab2[i-34]==1) zywa++;
										if(tab2[i-33]==1) zywa++;
										if(tab2[i-32]==1) zywa++;
										if(tab2[i-1]==1) zywa++;
										if(tab2[i+1]==1) zywa++;
										if(tab2[i+32]==1) zywa++;
										if(tab2[i+33]==1) zywa++;
										if(tab2[i+34]==1) zywa++;
									}				
								}
		
							}
						}
					}
				}
			}			
			//Reguły dla gry w życie, dane zapisujemy w tymczasowej tablicy tab3
			if(tab2[i]===0) //Jeśli komórka jest martwa i ma trzech żywych sąsiadów to staje się ona żywa, w przeciwnym razie jest martwa
			{
				if(zywa==3) tab3[i]=1;
				else tab3[i]=0;
			}
			else //Jeśli komórka jest żywa i ma 2 lub 3 żywych sąsiadów to pozostaje ona żywa, w przeciwnym razie staje się martwa 
			{
				if(zywa==3||zywa==2) tab3[i]=1;
				else tab3[i]=0;
			}
		}
		for(let i=0;i<627;i++) //Kopiujemy dane z tablicy tymczasowej do tablicy przechowującej stan komórek
		{
			tab2[i]=tab3[i];
		}
		umieraj(); //Wywołanie funkcji sprawdzającej ile cykli żyje dana komórka, jeśli zyje 50 cykli to zmienia jej stan na martwy
	}