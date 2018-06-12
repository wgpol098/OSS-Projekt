 //Obiekt button-start,stop,wznow, czyść
 const start = document.getElementById('start');
 const stop = document.getElementById('stop');
 const res = document.getElementById('reset'); 
 
//Tablice kolejno - Tablica divów z komórkami - Tablica zawierająca aktualny stan komórki - Tablica do przechowywania stanu komórki tmp - Licznik cykli
 let tab1=[],tab2=[],tab3=[],tab4=[],tab5=[];
 
 //Dodanie zmiennej do liczenia w przycisku STOP
 let k=0;
 
 //Licznik kroków 
 let licznik=0;
 
 //Licznik żywych i martwych elementów
 let licznik_zyw=0;
 let licznik_martw=627;
 
 
 //Interwały
 let Intgra;
 let Intstan;
	
//Zmienna przechowująca dane o tym, czy plansza jest startowana czy restartowana
let r=0;
	//Utworzenie planszy
	tworz_plansza();
	zer_tab2();
	zer_tab4();
	zer_tab5();
	
	//Zdarzenie kliknięcia na komórkę
	document.querySelector(".container").addEventListener("click",dodaj);
	
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
			if(tab2[x]===1)
			{
				if(licznik===0) licznik=-1;
				else licznik--;
				tab2[x]=2;
				akt_stan();
			}
			else
			{
				if(licznik===0) licznik=-1;
				else licznik--;
				tab2[x]=0;
				akt_stan();
			}
			
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
		r=0;
	}
	//Funkcja która działa po kliknięciu w przycisk "START"
	start.onclick = function()
	{
		//Jeżeli podana przez użytkownika ilość komórek do wylosowania jest większa, niż wielkość planszy to wyświetla alert i kończy działanie funkcji
		if(document.getElementById('ilosc').value>627)
		{
			alert("PODANO ZA DUŻĄ WARTOŚĆ!");
			return 0;
		}
		//Analogicznie jak wyżej z tym, że jeżeli użytkownik podał za małą wartość 
		if(parseInt(document.getElementById('ilosc').value)<0)
		{
			alert("PODANO ZA MAŁĄ WARTOŚĆ!");
			return 0;
		}
		//Jeżeli startujemy grę pierwszy raz
		if(r===0)
		{
			start.value="RESTART"; //Wartość przycisku "START" zmieniamy na "RESTART"
			licznik=0;	//Zerowanie licznika cykli
			pocz_zywe(); //Wywołanie funkcji która losuje początkowe położenie komórek
			clearInterval(Intgra); //Czyszczenie interwału
			clearInterval(Intstan); //Czyszczenie interwału
			Intgra = window.setInterval (gra, 100); //Stworznie nowego interwału, który liczy, które komórki będą żywe, a które martwe 
			Intstan = window.setInterval (akt_stan, 100); //Stworznie nowego interwału wyświetlającego aktualne stany komórki
		
			if(k%2==1)
			{
				stop.value="STOP";
				k++;
			}
			
			r++;
		}
		//Jeśli funkcja jest odpalana minimum po raz drugi
		else
		{
			licznik=0; //Zerowanie licznika cykli
			clearInterval(Intgra); //Czyszczenie interwału
			clearInterval(Intstan); //Czyszczenie interwału
			zer_tab2(); //Zerowanie tablicy zawierającej dane o tym czy komórka żyje, czy też nie 
			gra();
			akt_stan();
			pocz_zywe();
			
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
				let kolor = losuj_zywa();
				if(kolor>627/2)
				{
					tab2[x]=1;
					tab1[x].style.backgroundColor="red";
				}
				else
				{
					tab2[x]=2;
					tab1[x].style.backgroundColor="yellow";
				}
			}
		}	
		//Licznik żywych komórek
		licznik_zyw=licznik_zyw+ilosc;
		licznik_martw=licznik_martw-ilosc;
	}
	
	//Funkcja wywoływana do wyswietlania stanu komórki
	function akt_stan()
	{
		//Ustawienie liczników martwych i żywych komórek na wartość 0
		licznik_martw=0;
		licznik_zyw=0;
		//Pętla sprawdzająca czy dana komórka jest żywa czy martwa
		//Pętla sprawdza jaki kolor ma div w którym znajduje się komórka 
		for(let i=0;i<627;i++)
		{
			//Jeśli komórka jest martwa to kolor diva będzie równy 0 i zwiększa się licznik martwych komórek
			if(tab2[i]==0)
			{
				tab1[i].style.backgroundColor="white";
				licznik_martw++;
			}
			//Jeżeli komórka jest żywa i jest to komórka 1 typu to ustawia kolor diva na czerwony i zwiększa się licznik żywych komórek
			if(tab2[i]==1)
			{
				tab1[i].style.backgroundColor="red";
				licznik_zyw++;
			}				
			//Jeżeli komórka jest żywa i jest to komórka 2 typu to ustawia kolor diva na żółty i zwiększa się licznik żywych komórek
			if(tab2[i]==2)
			{
				tab1[i].style.backgroundColor="yellow";
				licznik_zyw++;
			}
			
			//Funkcja sprawdzająca czy są jakiekolwiek żywe komórki
			//Jeżeli wszystkie komórki umarły ( funcja zwraca 1 - błąd ) to kończym grę i czyścimy interwały 
			if(czy_zywe()==1) 
			{
				clearInterval(Intgra);
				clearInterval(Intstan);	
				r=0;
			}
		}
		
		//Liczniki
		licznik++;
		const licz=document.querySelector('.licznik');
		licz.innerText="Krok "+licznik;
		
		const licz_martwe=document.querySelector('.martwe');
		licz_martwe.innerText="Martwe: "+licznik_martw;
		
		const licz_zywe=document.querySelector('.zywe');
		licz_zywe.innerText="Żywe: "+licznik_zyw;
	}
	
	//Funkcja zapetlajaca gre 
	function gra()
	{
		//Obliczanie ile żywych komórek jest wokół komórki
		for(let i=0;i<627;i++)
		{
		
			//Zmienne przechowujące jaki kolor ma dana komórka
			let zr=0;
			let zy=0;
			//Lewy gorny rog
			if(i===0)
			{
				if(tab2[1]==1)  zr++;
				if(tab2[33]==1)  zr++;
				if(tab2[34]==1)  zr++;
				if(tab2[32]==1)  zr++;
				if(tab2[32+33]==1)  zr++;
				if(tab2[594]==1)  zr++;
				if(tab2[595]==1)  zr++;
				if(tab2[594+32]==1)  zr++;
				
				if(tab2[1]==2)  zy++;
				if(tab2[33]==2)  zy++;
				if(tab2[34]==2)  zy++;
				if(tab2[32]==2)  zy++;
				if(tab2[32+33]==2)  zy++;
				if(tab2[594]==2)  zy++;
				if(tab2[595]==2)  zy++;
				if(tab2[594+32]==2)  zy++;

			}
			else
			{
			//Prawy górny róg
			if(i==32)
			{
				if(tab2[i-1]==1)  zr++;
				if(tab2[i+33]==1)  zr++;
				if(tab2[i+32]==1)  zr++;
				if(tab2[0]==1)  zr++;
				if(tab2[33]==1)  zr++;
				if(tab2[594]==1)  zr++;
				if(tab2[594+32]==1)  zr++;
				if(tab2[594+31]==1)  zr++;
				
				if(tab2[i-1]==2)  zy++;
				if(tab2[i+33]==2)  zy++;
				if(tab2[i+32]==2)  zy++;
				if(tab2[0]==2)  zy++;
				if(tab2[33]==2)  zy++;
				if(tab2[594]==2)  zy++;
				if(tab2[594+32]==2)  zy++;
				if(tab2[594+31]==2)  zy++;
			}
			else
			{
			//Prawy dolny róg
			if(i==594)
			{
				if(tab2[i+1]==1)  zr++;
				if(tab2[i-33]==1)  zr++;
				if(tab2[i-32]==1)  zr++;
				if(tab2[0]==1)  zr++;
				if(tab2[i+32]==1)  zr++;
				if(tab2[32]==1)  zr++;
				if(tab2[1]==1)  zr++;
				if(tab2[i-1]==1)  zr++;
				
				if(tab2[i+1]==2)  zy++;
				if(tab2[i-33]==2)  zy++;
				if(tab2[i-32]==2)  zy++;
				if(tab2[0]==2)  zy++;
				if(tab2[i+32]==2)  zy++;
				if(tab2[32]==2)  zy++;
				if(tab2[1]==2)  zy++;
				if(tab2[i-1]==2)  zy++;
			}
			else
			{
			//Lewy dolny róg
			if(i==626)
			{
				if(tab2[i-1]==1)  zr++;
				if(tab2[i-33]==1)  zr++;
				if(tab2[i-34]==1)  zr++;
				if(tab2[i-32]==1)  zr++;
				if(tab2[i-32-33]==1)  zr++;
				if(tab2[0]==1)  zr++;
				if(tab2[32]==1)  zr++;
				if(tab2[31]==1)  zr++;
				
				if(tab2[i-1]==2)  zy++;
				if(tab2[i-33]==2)  zy++;
				if(tab2[i-34]==2)  zy++;
				if(tab2[i-32]==2)  zy++;
				if(tab2[i-32-33]==2)  zy++;
				if(tab2[0]==2)  zy++;
				if(tab2[32]==2)  zy++;
				if(tab2[31]==2)  zy++;
			}
			else
			{
			if(i!==0&&i<32)
			{
				if(tab2[593+i]==1)  zr++;
				if(tab2[594+i]==1)  zr++;
				if(tab2[595+i]==1)  zr++;
				if(tab2[i-1]==1)  zr++;
				if(tab2[i+1]==1)  zr++;
				if(tab2[i+32]==1)  zr++;
				if(tab2[i+33]==1)  zr++;
				if(tab2[i+34]==1)  zr++;

				if(tab2[593+i]==2)  zy++;
				if(tab2[594+i]==2)  zy++;
				if(tab2[595+i]==2)  zy++;
				if(tab2[i-1]==2)  zy++;
				if(tab2[i+1]==2)  zy++;
				if(tab2[i+32]==2)  zy++;
				if(tab2[i+33]==2)  zy++;
				if(tab2[i+34]==2)  zy++;
			}
			else
			{
				//Sprawdź lepiej to
				if(i>594)
				{
					if(tab2[i-34]==1)  zr++;
					if(tab2[i-33]==1)  zr++;
					if(tab2[i-32]==1)  zr++;
					if(tab2[i-1]==1)  zr++;
					if(tab2[i+1]==1)  zr++;
					if(tab2[i%33]==1)  zr++;
					if(tab2[i%33+1]==1)  zr++;
					if(tab2[i%33-1]==1)  zr++;	

					if(tab2[i-34]==2)  zy++;
					if(tab2[i-33]==2)  zy++;
					if(tab2[i-32]==2)  zy++;
					if(tab2[i-1]==2)  zy++;
					if(tab2[i+1]==2)  zy++;
					if(tab2[i%33]==2)  zy++;
					if(tab2[i%33+1]==2)  zy++;
					if(tab2[i%33-1]==2)  zy++;	
				}
				else
				{
					if(i%33==32)
					{
						if(tab2[i-33]==1)  zr++;
						if(tab2[i+33]==1)  zr++;
						if(tab2[i-34]==1)  zr++;
						if(tab2[i+32]==1)  zr++;
						if(tab2[i-1]==1)  zr++;
						if(tab2[i+1]==1)  zr++;
						if(tab2[i-32]==1)  zr++;
						if(tab2[i-32-33]==1)  zr++;
						
						if(tab2[i-33]==2)  zy++;
						if(tab2[i+33]==2)  zy++;
						if(tab2[i-34]==2)  zy++;
						if(tab2[i+32]==2)  zy++;
						if(tab2[i-1]==2)  zy++;
						if(tab2[i+1]==2)  zy++;
						if(tab2[i-32]==2)  zy++;
						if(tab2[i-32-33]==2)  zy++;
					}
					if(i%33===0)
					{
						if(tab2[i-33]==1)  zr++;
						if(tab2[i+33]==1)  zr++;
						if(tab2[i+34]==1)  zr++;
						if(tab2[i-32]==1)  zr++;
						if(tab2[i+1]==1)  zr++;
						if(tab2[i+32]==1)  zr++;
						if(tab2[i-1]==1)  zr++;
						if(tab2[i+32+33]==1)  zr++;
						
						if(tab2[i-33]==2)  zy++;
						if(tab2[i+33]==2)  zy++;
						if(tab2[i+34]==2)  zy++;
						if(tab2[i-32]==2)  zy++;
						if(tab2[i+1]==2)  zy++;
						if(tab2[i+32]==2)  zy++;
						if(tab2[i-1]==2)  zy++;
						if(tab2[i+32+33]==2)  zy++;
					}
					if(i%33!==0&&i%33!=32)
					{
						if(tab2[i-34]==1)  zr++;
						if(tab2[i-33]==1)  zr++;
						if(tab2[i-32]==1)  zr++;
						if(tab2[i-1]==1)  zr++;
						if(tab2[i+1]==1)  zr++;
						if(tab2[i+32]==1)  zr++;
						if(tab2[i+33]==1)  zr++;
						if(tab2[i+34]==1)  zr++;
						
						if(tab2[i-34]==2)  zy++;
						if(tab2[i-33]==2)  zy++;
						if(tab2[i-32]==2)  zy++;
						if(tab2[i-1]==2)  zy++;
						if(tab2[i+1]==2)  zy++;
						if(tab2[i+32]==2)  zy++;
						if(tab2[i+33]==2)  zy++;
						if(tab2[i+34]==2)  zy++;
					}				
				}
		
			}
			}
			}
			}
			}

			
			//Algorytm gry 
			if(tab2[i]===0)
			{
				if(zr+zy==3)
				{
					if(zr>zy) tab3[i]=1;
					else tab3[i]=2;
				}					
				else tab3[i]=0;
			}
			else
			{
				if(zr+zy==3||zr+zy==2)
				{
					tab3[i]=tab2[i];
				}					
				else tab3[i]=0;
			}
		}
		
		//Kopiowanie do tab2
		for(let i=0;i<627;i++)
		{
			tab2[i]=tab3[i];
		}
		
		//Funkcja sprawdzająca ile cykli ma dana komórka
		umieraj();
	}