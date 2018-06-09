 //Obiekt button-start,stop,wznow, czyść
 const start = document.getElementById('start');
 const stop = document.getElementById('stop');
 const res = document.getElementById('reset');
 //Dodanie zmiennej do liczenia w przycisku STOP
 let k=0;
 //Tablica elementow
 let tab1=[];
 //Tablica zawierajaca stan komorki 0 - martwy 1 - zywy
 let tab2=[];
 //Tablica temp
 let tab3=[];
 //Tablica licząca ile cyklów żyje dana komórka
 let tab4=[];
 
 //Licznik kroków 
 let licznik=0;
 
 //Licznik żywych i martwych elementów
 let licznik_zyw=0;
 let licznik_martw=627;


//OGARNĄĆ TE CYKLE KOMÓREK PO CZYSZCZENIU




 
 
 //Interwały
 let Intgra;
 let Intstan;
	
//Zmienna przechowująca dane o tym, czy plansza jest startowana czy restartowana
let r=0;

	//Utworzenie planszy
	tworz_plansza();
	zer_tab2();
	zer_tab4();
	
	//Zdarzenie kliknięcia
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
	
	//Funkcja wywoływana do wyswietlania stanu komórki
	function akt_stan()
	{
		licznik_martw=0;
		licznik_zyw=0;
		//Plansza
		for(let i=0;i<627;i++)
		{
			if(tab2[i]==1)
			{
				tab1[i].style.backgroundColor="blue";
				licznik_zyw++;
			}				
			else
			{
				tab1[i].style.backgroundColor="white";
				licznik_martw++;
			}	
			
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
		//Rogi sprawdź lewą stronę
		//Obliczanie ile żywych komórek jest wokół komórki
		for(let i=0;i<627;i++)
		{
		
			let zywa=0;
			
			//Lewy gorny rog
			if(i===0)
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
			//Prawy górny róg
			if(i==32)
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
			//Prawy dolny róg
			if(i==594)
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
			//Lewy dolny róg
			if(i==626)
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
			if(i!==0&&i<32)
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
				//Sprawdź lepiej to
				if(i>594)
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
					if(i%33==32)
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
					if(i%33===0)
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

			
			//reguły
			if(tab2[i]===0)
			{
				if(zywa==3) tab3[i]=1;
				else tab3[i]=0;
			}
			else
			{
				if(zywa==3||zywa==2) tab3[i]=1;
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
		
		//akt_stan();
		//window.requestAnimationFrame(gra);
	}