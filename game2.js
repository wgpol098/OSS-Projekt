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
 
 //Licznik kroków 
 let licznik=0;
 
 //Licznik żywych i martwych elementów
 let licznik_zyw=0;
 let licznik_martw=627;
 
 
 //Interwały
 let Intgra;
 let Intstan;
	
	//Utworzenie planszy
	tworz_plansza();
	zer_tab2();
	
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
	//Funckja czyszcząca tablicę 2, czyli przechowującą informację czy komórka jest żywa czy martwa 
	//Ustawiamy stan wszystkich komórek na martwy
	function zer_tab2()
	{
		for(let i=0;i<627;i++)
		{
			tab2[i]=0;
		}	
	}
	//Funkcja resetująca planszę
	res.onclick=function()
	{
		zer_tab2();
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
		
		//akt_stan();
		//window.requestAnimationFrame(gra);
	}