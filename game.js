	//Obiekt button-start,stop,wznow
	var start = document.getElementById('start');
	var stop = document.getElementById('stop');
	
	//Tablica elementow
	var tab1=[];
	//Tablica zawierajaca stan komorki 0 - martwy 1 - zywy
	var tab2=[];
	//Tablica temp
	var tab3=[];
	
	//Licznik kroków 
	var licznik;
	
	//Interwały
	var Intgra;
	var Intstan;
	
	//Funkcja która działa po kliknięciu w przycisk start
	start.onclick = function()
	{
		start.value="RESTART";
		//Zerowanie licznika
		licznik=0;
		document.querySelector('.container').innerHTML="";
		tworz_plansza();
		pocz_zywe();
		//gra();
		clearInterval(Intgra);
		clearInterval(Intstan);
		Intgra = window.setInterval (gra, 100);
		Intstan = window.setInterval (akt_stan, 100);
	}
	
	//Funkcja która działa po kliknięciu w przycisk stop
	stop.onclick = function()
	{
		clearInterval(Intgra);
		clearInterval(Intstan);
		stop.value="STOP";
		//stop.id="wznow";
	}
	
	//Funkcja tworzaca poczatkowe polozenie zywych komorek
	function pocz_zywe()
	{
		var ilosc = document.getElementById('ilosc');
		
		//Zerowanie tablicy, że martwe
		for(i=0;i<627;i++)
		{
			tab2[i]=0;
		}
		
		//Dodawanie żywych komórek
		for(i=0;i<ilosc.value;i++)
		{
			var x = losuj_zywa();
			if(tab2[x]==1) i--;
			else
			{
				tab2[x]=1;
				tab1[x].style.backgroundColor="blue";
			}
		}		
	}
	
	//Funkcja losująca w której komórce ma być komórka żywa
	function losuj_zywa()
	{
		return Math.floor(Math.random()*627);
	}
	
	//Funkcja tworząca divy, czyli plansze
	function tworz_plansza()
	{
		//Licznik
		var licz=document.querySelector('.licznik');
		licz.innerText="Krok "+licznik;
		
		//Plansza
		var plansza = document.querySelector('.container');
		for(i=0;i<627;i++)
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
		//Plansza
		for(i=0;i<627;i++)
		{
			if(tab2[i]==1) tab1[i].style.backgroundColor="blue";
			else tab1[i].style.backgroundColor="white";
		}
		
		//Licznik
		licznik++;
		var licz=document.querySelector('.licznik');
		licz.innerText="Krok "+licznik;
	}
	
	//Funkcja zapetlajaca gre 
	function gra()
	{
		//Rogi sprawdź lewą stronę
		//Obliczanie ile żywych komórek jest wokół komórki
		for(i=0;i<627;i++)
		{
		
			var zywa=0;
			
			//Lewy gorny rog
			if(i==0)
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
			if(i!=0&&i<32)
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
					if(i%33==0)
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
					if(i%33!=0&&i%33!=32)
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
			if(tab2[i]==0)
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
		for(i=0;i<627;i++)
		{
			tab2[i]=tab3[i];
		}
		
		//akt_stan();
		//window.requestAnimationFrame(gra);
	}