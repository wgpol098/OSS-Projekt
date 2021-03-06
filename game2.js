 //Przypisanie do stałych "buttonów" - START, STOP, RESET
 const start = document.getElementById("start");
 const stop = document.getElementById("stop");
 const res = document.getElementById("reset");
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
	
	function dodaj(e) //Funkcja zmieniająca stan komórki po kliknięciu na nią - na żywy lub martwy
	{
		let x=parseInt(e.target.id); //Przypisujemy zmiennej x id komórki, którą kliknęliśmy, jej id jest zwyczajnie jej numerem
		if(tab2[x]===0) //Jeśli komórka jest martwa to ustawiamy jej stan na żywą i odświeżamy planszę wywołując funkcję akt_stan()
		{
			if(licznik===0) licznik=-1;
			else licznik--;
			tab2[x]=1;
			akt_stan();
			
		}
		else //Jeżeli komórka, którą kliknęliśmy jest żywa to ustawiamy jej stan na martwy i odświeżamy planszę wywołując funkcję akt_stan()
		{
			if(licznik===0) licznik=-1;
			else licznik--;
			tab2[x]=0;
			akt_stan();
		}
	}
	
	res.onclick=function() //Funkcja wywoływana przy kliknięciu w przycisk RESET
	{	
		//Kolejno zerowanie tablic - Stan komórek na martwy - Ilość cykli życia komórki na 0 - Ilość cykli życia komórki na 0
		zer_tab2();
		zer_tab4();
		zer_tab5();
		licznik=-1;
		akt_stan(); //Wywołanie funkcji, która odświeży planszę i stan znajdujących się na niej komórek 
		clearInterval(Intgra); //Wyczyszczenie interwału wywołującego funkcję, która ustawia aktualny stan komórki
		clearInterval(Intstan); //Wyczyszczenie interwału wywołującego funkcję, która ustawia aktualny stan komórki na planszy
		start.value="START"; //Ustawiamy tekst dla przycisku START na START
		stop.value="STOP"; //Ustawiamy tekst dla przycisku STOP na STOP
		document.getElementById('ilosc').value=""; //Czyszczenie inputa w którym użytkownik wprowadza ile komórek, ma być losowanych
	}
	
	start.onclick = function() //Funkcja która wywoływana jest po kliknięciu w przycisk START
	{
		if(document.getElementById('ilosc').value>627) //Jeżeli użytkownik poda za dużą liczbę komórek to wyświetla się alert
		{
			alert("PODANO ZA DUŻĄ WARTOŚĆ!");
			return 0; //Funkcja zwraca wartość, żeby zakończyć swoje działanie 
		}
		if(parseInt(document.getElementById('ilosc').value)<0) //Jeżeli użytkownik poda za małą liczbę komórek to wyświetla się alert
		{
			alert("PODANO ZA MAŁĄ WARTOŚĆ!");
			return 0; //Funkcja zwraca wartość, żeby zakończyć swoje działanie 
		}
		
		zer_tab5(); //Wywołanie funkcji zerującej średnią ilość życia komórki
		if(r===0) //Jeżeli funkcja wywoływana jest po raz pierwszy
		{
			start.value="RESTART"; //Ustawienie tekstu w przycisku START na RESTART
			licznik=0; //Zerowanie licznika cykli komórek
			pocz_zywe(); //Wywłanie funkcji losującej i ustawiającej ilość żywych komórki podane przez użytkownika
			clearInterval(Intgra); //Czyszczenie interwału odpowiadającego za sprawdzanie stanu komórek w następnym cyklu 
			clearInterval(Intstan); //Czyszczenie interwału odpowiadającego za pokazywanie aktualnego stanu komórek
			Intgra = window.setInterval (gra, 100); //Przypisanie do zmiennej interwału wywołującego funkcję gra
			Intstan = window.setInterval (akt_stan, 100); //Przypisanie do zmiennej interwału wywołującego funckję akt_stan
			if(k%2==1) //Jeśli k jest nieparzyste to napis na przycisku STOP będzie STOP
			{
				stop.value="STOP";
				k++;
			}
			r++;
		}
		else //Kiedy funkcja wywoływana jest więcej niż pierwszy raz
		{
			start.value="RESTART"; //Ustawienie tekstu w przycisku START na RESTART
			licznik=0; //Zerowanie licznika cykli komórek
			clearInterval(Intgra); //Czyszczenie interwału odpowiadającego za sprawdzanie stanu komórek w następnym cyklu 
			clearInterval(Intstan); //Czyszczenie interwału odpowiadającego za pokazywanie aktualnego stanu komórek
			zer_tab2(); //Wywołanie komórki zerującej tablicę, w której przechowywany jest aktualny stan komórki
			gra(); //Wywołanie funkcji sprawdzającej jaki stan mają komórki w następnym cyklu
			akt_stan(); //Wywołanie funkcji pokazującej aktualny stan komórek
			pocz_zywe(); //Wywołanie funkcji która losuje żywe komórki na planszy 
			Intgra = window.setInterval (gra, 100); //Przypisanie do zmiennej interwału wywołującego funkcję gra
			Intstan = window.setInterval (akt_stan, 100); //Przypisanie do zmiennej interwału wywołującego funckję akt_stan
			if(k%2==1) //Jeśli k jest nieparzyste to napis na przycisku STOP będzie STOP
			{
				stop.value="STOP";
				k++;
			}
			r++;
		}
	}
	
	stop.onclick = function() //Funkcja wywoływana po kliknięciu w przycisk STOP/WZNÓW
	{
		if(k%2===0) //Jeśli przycisk jest przyciskiem STOP to czyścimy interwały wywołujące funkcje sprawdzające stan komórek i uaktualnianie planszy
		{
			clearInterval(Intgra);
			clearInterval(Intstan);
			stop.value="WZNÓW"; //Zmieniamy tekst na przycisku STOP na WZNÓW
			k++;
		}
		else //Jeśli przycisk jest przyciskiem WZNÓW to startujemy interwały wywołujące funkcje sprawdzające stan komórek i uaktualnienie planszy
		{
			Intgra = window.setInterval (gra, 100);
			Intstan = window.setInterval (akt_stan, 100);
			stop.value="STOP"; //Zmieniamy tekst na przycisku WZNÓW na STOP
			k++;
		}
	}
	
	function pocz_zywe() //Funkcja odpowiedzialna za ustawienie początkowego położenia żywych komórek
	{
		const ilosc = document.getElementById('ilosc'); //Stała przechowująca element, w który wpisujemy ilość losowanych komórek
		for(let i=0;i<ilosc.value;i++) //Dodajemy ilość żywych komórek do planszy jaką podał użytkownik
		{
			let x = losuj_zywa(); //Przypisanie zmiennej x tego co zwraca funkcja odpowiedzialna za losowanie liczb z przedziału 0-627
			if(tab2[x]==1) i--; //Jeśli komórka jest żywa odejmujemy krok i będziemy losować jeszcze raz
			else //W przeciwnym wypadku ustawiamy stan komórki na żywy i kolor tła elementu odpowiadającemu komórce na niebiski
			{
				tab2[x]=1;
				tab1[x].style.backgroundColor="blue";
			}
		}	
		licznik_zyw=licznik_zyw+ilosc; //Dodajemy do licznika komórek żywych ilość wylosowanych komórek
		licznik_martw=licznik_martw-ilosc; //Odejmujemy od licznika żywych komórek ilość wylosowanych komórek
	}
	
	function akt_stan() //Funkcja, która wyświetla aktualny stan komórki
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
		licznik++; //Licznik cyklu zwiększamy o 1
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
	
	function gra() //Funkcja odpowiedzialna za sprawdzanie stanu komórki w kolejnym cyklu
	{
		for(let i=0;i<627;i++) //Obliczanie ile żywych komórek sąsiaduje z daną komórką 
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
									if(i%33!==0&&i%33!=32) //Jeśli sprawdzana komórka nie znajduje się na skraju planszy
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