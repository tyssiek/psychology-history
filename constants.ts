
export const UI_PL = {
  chapter: 'Rozdział',
  school: 'Nurt',
  person: 'Osoba',
  experiment: 'Eksperyment',
  concept: 'Pojęcie',
  method: 'Metoda',
  context: 'Kontekst',
  root: 'Mapa',
  story: 'Historia',
  explore: 'Eksploruj',
  study_layer: 'Warstwa nauki',
  hide_answers: 'Ukryj odpowiedzi',
  search_placeholder: 'Szukaj osób, wydarzeń, nurtów...',
  jump_to_knowledge: 'Skocz do elementu',
  visible_node_types: 'Widoczne typy',
  learning_layers: 'Warstwy nauki',
  people: 'Osoby',
  experiments: 'Eksperymenty',
  connections: 'Powiązania',
  summary: 'Podsumowanie',
  details: 'Szczegóły',
  concepts_and_terms: 'Pojęcia i terminy',
  source: 'Źródło',
  pages: 'Strony',
  reveal_content: 'Kliknij, aby odkryć',
  linked_knowledge: 'Powiązana wiedza',
  fit_view: 'Dopasuj widok',
  focus: 'Skup na węźle',
  reset_default: 'Resetuj ustawienia',
  patch_data: 'Wgraj patch (.csv)',
  history_atlas: 'Atlas Historii Psychologii',
  knowledge_initializing: 'Inicjalizacja silnika wiedzy...',
  select_node_hint: 'Wybierz element, aby odkryć szczegóły'
};

export const CSV_CHAPTERS = `chapter_id,order,title,time_start,time_end,one_liner,source_pages
ch01,1,Wprowadzenie i przedmiot psychologii,1,4,Zakres i kontekst przedmiotu oraz cele wykładu.,1-4
ch02,2,Psychologia jako nauka empiryczna i źródła wiedzy,5,6,Czym jest naukowość psychologii i jak zdobywa się wiedzę.,5-6
ch03,3,Psychologia potoczna i pułapki intuicji,7,21,Dlaczego intuicja i 'mądrości ludowe' bywają mylące w wyjaśnianiu zachowania.,7-21
ch04,4,Psychologia przednaukowa,22,23,"Przednaukowe próby wyjaśniania człowieka (np. frenologia, fizjonomika, mesmeryzm).",22-23
ch05,5,Narodziny psychologii naukowej i strukturalizm,24,32,"Wundt i laboratorium 1879, początki psychologii eksperymentalnej, strukturalizm i Titchener.",24-32
ch06,6,Funkcjonalizm,33,49,"Funkcje procesów psychicznych, inspiracje ewolucyjne i pragmatyczne podejście.",33-49
ch07,7,Psychologia postaci (Gestalt) i pole Lewina,50,69,"Organizacja percepcji, krytyka 'cegieł' świadomości, pole psychologiczne i efekty uczennic Lewina.",50-69
ch08,8,Behawioryzm i rozwinięcia uczenia się,70,85,"Zachowanie jako przedmiot badań, warunkowanie, wzmocnienia, uczenie społeczne i wyuczona bezradność.",70-85
ch09,9,Psychodynamiczna i psychoanaliza,86,96,"Nieświadomość, psychopatologia, obserwacja kliniczna, psychoanaliza i teorie Adlera i Junga.",86-96
ch10,10,Psychologia humanistyczna,97,98,"Wolna wola, godność klienta, terapia zorientowana na klienta, Rogers i Maslow.",97-98
ch11,11,"Choroby psychiczne, psychoterapia i etyka badań",99,111,"Historia leczenia, rola psychologii współczesnej oraz problemy etyczne badań.",99-111
ch12,12,Psychologia w Polsce: ośrodki i postacie,112,127,"Pierwsze pracownie, ośrodki akademickie i postacie polskiej psychologii, w tym Ochorowicz.",112-127
ch13,13,Zwierzęta w badaniach i etyka badań na zwierzętach,128,137,Przykłady badań i współpracy ze zwierzętami oraz kwestie etyczne.,128-137`;

export const CSV_NODES = `id,label,type,chapter_id,time_start,time_end,summary,details,keywords,source_pages
ch01,Wprowadzenie i przedmiot psychologii,chapter,ch01,1,4,Zakres i kontekst przedmiotu oraz cele wykładu.,,rozdział|story,1-4
ch02,Psychologia jako nauka empiryczna i źródła wiedzy,chapter,ch02,5,6,Czym jest naukowość psychologii i jak zdobywa się wiedzę.,,rozdział|story,5-6
ch03,Psychologia potoczna i pułapki intuicji,chapter,ch03,7,21,Dlaczego intuicja i 'mądrości ludowe' bywają mylące w wyjaśnianiu zachowania.,,rozdział|story,7-21
ch04,Psychologia przednaukowa,chapter,ch04,22,23,"Przednaukowe próby wyjaśniania człowieka (np. frenologia, fizjonomika, mesmeryzm).",,rozdział|story,22-23
ch05,Narodziny psychologii naukowej i strukturalizm,chapter,ch05,24,32,"Wundt i laboratorium 1879, początki psychologii eksperymentalnej, strukturalizm i Titchener.",,rozdział|story,24-32
ch06,Funkcjonalizm,chapter,ch06,33,49,"Funkcje procesów psychicznych, inspiracje ewolucyjne i pragmatyczne podejście.",,rozdział|story,33-49
ch07,Psychologia postaci (Gestalt) i pole Lewina,chapter,ch07,50,69,"Organizacja percepcji, krytyka 'cegieł' świadomości, pole psychologiczne i efekty uczennic Lewina.",,rozdział|story,50-69
ch08,Behawioryzm i rozwinięcia uczenia się,chapter,ch08,70,85,"Zachowanie jako przedmiot badań, warunkowanie, wzmocnienia, uczenie społeczne i wyuczona bezradność.",,rozdział|story,70-85
ch09,Psychodynamiczna i psychoanaliza,chapter,ch09,86,96,"Nieświadomość, psychopatologia, obserwacja kliniczna, psychoanaliza i teorie Adlera i Junga.",,rozdział|story,86-96
ch10,Psychologia humanistyczna,chapter,ch10,97,98,"Wolna wola, godność klienta, terapia zorientowana na klienta, Rogers i Maslow.",,rozdział|story,97-98
ch11,"Choroby psychiczne, psychoterapia i etyka badań",chapter,ch11,99,111,"Historia leczenia, rola psychologii współczesnej oraz problemy etyczne badań.",,rozdział|story,99-111
ch12,Psychologia w Polsce: ośrodki i postacie,chapter,ch12,112,127,"Pierwsze pracownie, ośrodki akademickie i postacie polskiej psychologii, w tym Ochorowicz.",,rozdział|story,112-127
ch13,Zwierzęta w badaniach i etyka badań na zwierzętach,chapter,ch13,128,137,Przykłady badań i współpracy ze zwierzętami oraz kwestie etyczne.,,rozdział|story,128-137
s_struct,Strukturalizm,school,ch05,UNKNOWN,UNKNOWN,Podejście skupione na analizie świadomości i jej elementów.,W materiałach wiązany z Wundtem i Titchenerem oraz z introspekcją jako narzędziem opisu doświadczenia.,świadomość|introspekcja|Wundt|Titchener,27-32
s_func,Funkcjonalizm,school,ch06,UNKNOWN,UNKNOWN,Podejście pytające o funkcje procesów psychicznych i ich rolę adaptacyjną.,"W slajdach pokazany jako kierunek rozwijany m.in. przez Jamesa i Woodwortha, z silną inspiracją ewolucyjną (Darwin).",funkcja|adaptacja|James|Woodworth|Darwin,33-49
s_gestalt,Psychologia postaci (Gestalt),school,ch07,UNKNOWN,UNKNOWN,Kierunek podkreślający organizację percepcji i całość doświadczenia.,W materiałach przeciwstawiany podejściu 'cegieł' (elementów) i opisuje prawa organizacji spostrzeżeń; powiązany z Lewinem i ujęciem pola.,percepcja|prawa organizacji|całość|Lewin,50-69
s_behav,Behawioryzm,school,ch08,UNKNOWN,UNKNOWN,"Kierunek, w którym przedmiotem badań jest obserwowalne zachowanie.","W slajdach podkreślono koncentrację na danych obserwacyjnych oraz znaczenie uczenia się (warunkowanie, wzmocnienie, kara) oraz rozwinięcia społeczno-poznawcze.",zachowanie|S-R|uczenie|wzmocnienie|kara,70-85
s_psychodyn,Teoria psychodynamiczna,school,ch09,UNKNOWN,UNKNOWN,"Podejście wyrosłe z medycyny i psychiatrii, skupione na psychopatologii i nieświadomości.","W slajdach: przedmiotem jest psychopatologia, metoda to obserwacja kliniczna, a centralnym tematem jest nieświadomość; przeciwstawiona tradycji czysto laboratoryjnej.",psychopatologia|nieświadomość|obserwacja kliniczna,86
s_human,Psychologia humanistyczna,school,ch10,1950,1969,"Podejście akcentujące wolną wolę, godność i samorealizację człowieka.",W materiałach: odpowiedź na 'mechanicystyczne' ujęcia psychodynamiczne i 'ubezwłasnowalniające' behawiorystyczne; kluczowe postacie to Rogers i Maslow.,wolna wola|samorealizacja|Rogers|Maslow,97
p_wundt,Wilhelm Wundt,person,ch05,1832,1920,Uważany za ojca psychologii; w slajdach pojawia się jako twórca laboratorium 1879.,Powiązany z psychologią eksperymentalną i fizjologiczną; w materiałach podkreślono znaczenie empirii i eksperymentalizmu.,laboratorium|1879|eksperyment|empiria,25-27
p_titchener,Edward B. Titchener,person,ch05,UNKNOWN,UNKNOWN,Autor ujęcia świadomości i umysłu w tradycji strukturalizmu.,W materiałach: rozróżnienie 'umysł' i 'świadomość' oraz nacisk na opis doświadczenia.,świadomość|umysł|strukturalizm,32
p_darwin,Charles Darwin,person,ch06,1809,1882,"Twórca teorii doboru naturalnego (1859), ważny kontekst dla funkcjonalizmu.","W slajdach: przeżywanie, adaptacja i ewolucyjne ramy rozumienia zachowania i funkcji procesów psychicznych.",dobór naturalny|adaptacja|1859,33-37
p_james,William James,person,ch06,UNKNOWN,UNKNOWN,Jedna z kluczowych postaci funkcjonalizmu w materiale.,W slajdach pojawia się w kontekście funkcjonalizmu oraz wpływów na późniejsze podejścia (wspomniany także przy biografii Watsona).,funkcjonalizm|pragmatyzm,40-47;74
p_woodworth,Robert S. Woodworth,person,ch06,UNKNOWN,UNKNOWN,Postać przedstawiana w wątku funkcjonalizmu.,W materiałach powiązany z funkcjonalizmem i ujęciem procesów jako ukierunkowanych na cele.,funkcjonalizm|cel,45-46
p_lewin,Kurt Lewin,person,ch07,UNKNOWN,UNKNOWN,Autor ujęcia pola psychologicznego i społecznego.,"W slajdach: stan równowagi, napięcie i działanie, oraz pole społeczne jako rama dla zachowania grupy; impuls dla rozwoju psychologii społecznej.",pole psychologiczne|równowaga|napięcie|psychologia społeczna,66-69
p_zeigarnik,Bluma Zeigarnik,person,ch07,UNKNOWN,UNKNOWN,Uczennica Lewina; efekt Zeigarnik (1927).,W materiałach: zadania niedokończone are pamiętane lepiej niż dokończone.,efekt Zeigarnik|pamięć|zadania,69
p_owsiankina,Maria Owsiankina,person,ch07,UNKNOWN,UNKNOWN,Uczennica Lewina; efekt Owsiankiny.,W materiałach: tendencja do kończenia rozpoczętych i przerwanych zadań.,efekt Owsiankiny|motywacja|zadania,69
p_thorndike,Edward L. Thorndike,person,ch08,1874,1949,Badacz uczenia się; prawo efektu i skrzynki problemowe.,W materiałach: badania na głodnych kotach w skrzynce problemowej; uczenie prób i błędów oraz koneksjonizm.,prawo efektu|skrzynka problemowa|koneksjonizm,70-72
p_pavlov,Iwan P. Pawłow,person,ch08,1849,1936,Badacz odruchów warunkowych i warunkowania klasycznego.,"W slajdach: skojarzenie bodźca i reakcji, generalizacja i różnicowanie; bodźce wtórne (np. dzwonki, światła).",odruch warunkowy|warunkowanie klasyczne|generalizacja,73
p_watson,John B. Watson,person,ch08,1878,1958,Autor manifestu behawiorystycznego (1913).,"W materiałach: psychologia jako nauka o nabytym zachowaniu przystosowawczym; krytyka pojęć umysłu; metody obserwacji, eksperymentu i testów.",manifest 1913|zachowanie|metody|testy,74
p_skinner,B.F. Skinner,person,ch08,1904,1990,Badacz warunkowania instrumentalnego i roli wzmocnień.,"W slajdach: prawo nabywania, wzmacnianie i kształtowanie zachowania; dodatkowo przykłady projektów i wizji społecznej (Walden Two).",warunkowanie instrumentalne|wzmocnienie|prawo nabywania|Walden Two,70;80-82
p_hull,Clark Hull,person,ch08,1884,1952,"Badacz rozwijający formalne, ilościowe podejście do uczenia się.","W materiałach: krytyka naiwności Watsona, metoda hipotetyczno-dedukcyjna, analizy statystyczne; badania warunkowania wyższego rzędu na szczurach.",hipotetyczno-dedukcyjna|statystyka|uczenie,76
p_bandura,Albert Bandura,person,ch08,1925,2021,Twórca ujęcia społeczno-poznawczego i modelowania.,"W slajdach: uczenie przez obserwację (wzmocnienie zastępcze), modelowanie oraz poczucie skuteczności.",modelowanie|uczenie przez obserwację|poczucie skuteczności,83
p_rotter,Julian Rotter,person,ch08,1916,2014,Autor teorii społecznego uczenia się i pojęcia umiejscowienia kontroli.,W materiałach: wewnętrzne vs zewnętrzne poczucie kontroli; rok 1966 przy pojęciu umiejscowienia kontroli.,umiejscowienie kontroli|społeczne uczenie|1966,83
p_seligman,Martin Seligman,person,ch08,UNKNOWN,UNKNOWN,Współautor badań nad wyuczoną bezradnością (1967) w materiale.,W slajdach pojawia się przy eksperymentach nad wyuczoną bezradnością razem z Maierem.,wyuczona bezradność|1967,84
p_maier,Steven Maier,person,ch08,UNKNOWN,UNKNOWN,Współautor badań nad wyuczoną bezradnością (1967) w materiale.,W slajdach pojawia się przy eksperymentach nad wyuczoną bezradnością razem z Seligmanem.,wyuczona bezradność|1967,84
p_richter,Curt Richter,person,ch08,1894,1988,Psychobiolog wykorzystujący badania na szczurach.,"W materiałach: eksperymenty nad 'topieniem się' i pytanie o to, co utrzymywało szczury na powierzchni.",szczury|topienie się|psychobiologia,85
p_freud,Sigmund Freud,person,ch09,UNKNOWN,UNKNOWN,Centralna postać wątku psychoanalizy; nacisk na seksualność w wyjaśnianiu zachowania.,"W materiałach: psychoanaliza jako metoda leczenia (sny, przejęzyczenia, swobodne skojarzenia, wyparcie, przeniesienie), a także krytyka: teoria trudna do weryfikacji.",psychoanaliza|sny|wyparcie|przeniesienie,89-90
p_adler,Alfred Adler,person,ch09,1870,1937,Alternatywna teoria psychodynamiczna: poczucie niższości i dążenie do mocy.,W slajdach: kompensacja i przezwyciężanie niższości; większa rola uwarunkowań społecznych niż biologicznych.,poczucie niższości|kompensacja|dążenie do mocy,96
p_jung,Carl Gustaw Jung,person,ch09,1875,1961,Psycholog głębi: archetypy i nieświadomość zbiorowa.,"W materiałach: motywy nigdy nieuświadamiane, archetypy, nieświadomość zbiorowa oraz cel rozwoju jako indywiduacja.",archetypy|nieświadomość zbiorowa|indywiduacja,96
p_rogers,Carl Rogers,person,ch10,1902,1987,Twórca terapii zorientowanej na klienta i idei bezwarunkowej akceptacji.,"W materiałach: klient równy terapeucie, terapeuta jako 'lustro', bezwarunkowo wspierający klimat i warunki wartości.",terapia zorientowana na klienta|bezwarunkowa akceptacja,97
p_maslow,Abraham Maslow,person,ch10,1908,1970,Autor piramidy potrzeb; samorealizacja jako ważny motyw w humanizmie.,W slajdach: piramida potrzeb oraz potrzeba samoaktualizacji/samorealizacji w terapii humanistycznej.,piramida potrzeb|samorealizacja,97
p_vonosten,Wilhelm von Osten,person,ch08,UNKNOWN,UNKNOWN,Właściciel konia Sprytnego Hansa (początek XX wieku).,W slajdach: postać związana z historią Sprytnego Hansa jako wątkiem z początków behawioryzmu.,Sprytny Hans,72
p_stumpf,Carl Stumpf,person,ch08,UNKNOWN,UNKNOWN,Psycholog badający przypadek Sprytnego Hansa.,W slajdach: uczestniczył w badaniu konia Sprytnego Hansa razem z doktorantem Oskarem Pfungstem.,Sprytny Hans|badanie,72
p_pfungst,Oskar Pfungst,person,ch08,UNKNOWN,UNKNOWN,Doktorant biorący udział w badaniu Sprytnego Hansa.,W slajdach: współbadał Sprytnego Hansa w zespole Carla Stumpfa.,Sprytny Hans|badanie,72
p_heinrich,Władysław Heinrich,person,ch12,UNKNOWN,UNKNOWN,W materiale nazwany 'polskim Wundtem'; założył pierwszą pracownię psychologii eksperymentalnej w 1902.,"W slajdach: profesor UJ, prekursor behawioryzmu (10 lat przed manifestem Watsona) i badania nad emocjami.",polski Wundt|1902|UJ|emocje,112
p_twardowski,Kazimierz Twardowski,person,ch12,UNKNOWN,UNKNOWN,Założył w 1904 drugą pracownię psychologiczną na Uniwersytecie Lwowskim.,W materiałach: pracował krótko w laboratorium Wundta w Lipsku; proponował polskie nazwy i definicje pojęć oraz 'ABC porządnego myślenia'.,1904|Lwów|ABC porządnego myślenia|Wundt,112-113
p_abramowski,Edward Abramowski,person,ch12,UNKNOWN,UNKNOWN,Założył w 1910 trzecią pracownię psychologiczną w Warszawie; badał pamięć i podświadomość.,W slajdach: odkrył zjawisko reminiscencji; później kierował seminarium psychologii doświadczalnej na UW.,1910|Warszawa|reminiscencja|pamięć,112;115
p_weryho,Władysław Weryho,person,ch12,UNKNOWN,UNKNOWN,Zainicjował sekcję psychologii przy zjazdach lekarzy i przyrodników w 1900.,W materiale: idea integracji psychologów z trzech zaborów.,1900|integracja,112
p_witwicki,Władysław Witwicki,person,ch12,UNKNOWN,UNKNOWN,Pierwszy doktorat z psychologii na UL (1901) i później profesor na UW.,W slajdach: studiował w Lipsku pod kierunkiem Wundta; twórca teorii kratyzmu; przygotował pierwszy polski podręcznik psychologii (1925 i 1927).,1901|Wundt|kratyzm|podręcznik 1925/1927,113;115
p_kreutz,Mieczysław Kreutz,person,ch12,UNKNOWN,UNKNOWN,Postać związana z rozwojem katedry i pracowni psychologicznej we Lwowie w dwudziestoleciu.,W slajdach: habilitacja 1927 (Zmienność rezultatów testów) i nominacja profesorska 1934.,1927|testy|Lwów,113
p_szewczuk,Włodzimierz Szewczuk,person,ch12,UNKNOWN,UNKNOWN,Badacz złudzeń optycznych; krytykował psychologię postaci.,W materiale: doktorat 1938 pod opieką Heinricha; krytyka Gestalt za pozorność praw.,złudzenia optyczne|krytyka Gestalt|1938,114
p_szuman,Stefan Szuman,person,ch12,UNKNOWN,UNKNOWN,Nestor polskiej psychologii rozwojowej w materiale.,"W slajdach: doktorat 1926 (Sztuka dziecka), habilitacja 1927, profesor zwyczajny 1934.",rozwój|1926|1934,114
p_baley,Stefan Baley,person,ch12,UNKNOWN,UNKNOWN,Psycholog pedagogiczny i praktyk; orędownik psychologii stosowanej.,"W slajdach: profesor na UW (1928, 1934), zajęcia z psychometrii i diagnostyki; wspierał praktykę i stanowisko psychologa szkolnego.",psychologia stosowana|psychometria|UW,116
p_blachowski,Stefan Błachowski,person,ch12,UNKNOWN,UNKNOWN,Organizował studium psychologii na Uniwersytecie Poznańskim od 1918.,"W materiale: profesor i kierownik zakładu; prowadził zajęcia z pamięci, myślenia, uczuć i woli.",Poznań|1918|pamięć|myślenie,117
p_czezowski,Tadeusz Czeżowski,person,ch12,UNKNOWN,UNKNOWN,Starał się utworzyć katedrę psychologii w Wilnie.,W slajdach: profesor w Wilnie od 1923; zapraszał młodych profesorów.,Wilno|1923|katedra psychologii,118
p_dybowski,Mieczysław Dybowski,person,ch12,UNKNOWN,UNKNOWN,Przejściowo pracował w Wilnie; wyróżnił 4 typy woli (temperamenty).,"W materiale: typy nazwane choleryk, sangwinik, flegmatyk i melancholik.",temperamenty|4 typy woli,118
p_zawadzki,Bohdan Zawadzki,person,ch12,UNKNOWN,UNKNOWN,Kierował Zakładem Psychologii na USB w Wilnie od 1935 (w materiale).,W slajdach: orędownik psychologii różnic indywidualnych/personologii.,personologia|różnice indywidualne|1935,118
p_ochorowicz,Julian Ochorowicz,person,ch12,1850,1917,"Postać łącząca wątki psychologii, medycyny i zainteresowań paranormalnych w materiale.","W slajdach: edukacja i etapy pracy (Lwów, Paryż, Warszawa, Wisła); pojawia się też jako organizator i badacz zjawisk mediumicznych.",Wisła|mediumizm|psychologia|Lwów,113;119-127
e_hans,Sprytny Hans,experiment,ch08,1900,1909,"Przypadek konia, którego 'umiejętności' badali Stumpf i Pfungst.","W materiale: początek XX wieku, właściciel von Osten; wątek pokazujący znaczenie kontroli sygnałów i interpretacji zachowania.",koń|Stumpf|Pfungst|von Osten,72
e_puzzlebox,Skrzynka problemowa Thorndike'a,experiment,ch08,UNKNOWN,UNKNOWN,Badania uczenia się na głodnych kotach w skrzynce problemowej.,W slajdach: uczenie metodą prób i błędów oraz koneksjonizm (połączenia sytuacja-reakcja).,koty|próby i błędy|koneksjonizm,72
e_lawofeffect,Prawo efektu (1898),experiment,ch08,1898,1898,Działania dające zadowolenie w danej sytuacji wiążą się z tą sytuacją.,W materiale: element wnioskowania Thorndike'a o uczeniu się na podstawie konsekwencji zachowania.,Thorndike|konsekwencje|uczenie,72
e_classcond,Warunkowanie klasyczne,experiment,ch08,UNKNOWN,UNKNOWN,Uczenie się przez skojarzenie bodźca i reakcji (odruchy warunkowe).,"W slajdach: bodźce wtórne (np. dzwonki, światła) wywołują reakcje; opis generalizacji i różnicowania.",Pawłow|odruchy warunkowe|generalizacja,73
e_littlealbert,Albert i biały szczur (1920),experiment,ch08,1920,1920,Watson i Rosalie Rayner: bodźce wywołujące reakcje emocjonalne u niemowląt.,W materiale: przykład warunkowania reakcji emocjonalnych u dziecka.,Watson|Rayner|emocje|warunkowanie,75
e_zeigarnik,Efekt Zeigarnik (1927),experiment,ch07,1927,1927,Zadania niedokończone są pamiętane lepiej niż dokończone.,"W slajdach: wynik badań Zeigarnik, uczennicy Lewina.",pamięć|zadania niedokończone,69
e_owsiankina,Efekt Owsiankiny,experiment,ch07,UNKNOWN,UNKNOWN,Tendencja do kończenia rozpoczętych i przerwanych zadań.,W materiale: efekt pokazany przez Marię Owsiankinę (uczennicę Lewina).,dokończenie|zadania przerwane,69
e_loc,Poczucie umiejscowienia kontroli (1966),experiment,ch08,1966,1966,"Wewnętrzne vs zewnętrzne przekonanie o tym, od czego zależy wzmocnienie.",W slajdach: pojęcie w ramach teorii społecznego uczenia się Rottera; zależność od własnych działań vs losu/szczęścia/działań innych.,Rotter|kontrola|wewnętrzne|zewnętrzne,83
e_learnedhelpless,"Wyuczona bezradność (Seligman i Maier, 1967)",experiment,ch08,1967,1967,Eksperymenty nad bezradnością jako skutkiem braku kontroli nad zdarzeniami.,W materiale: zestawione z badaniami Curt Paula Richtera (lata 50-te i 60-te).,bezradność|kontrola|1967,84
e_richter,Badania Richtera nad 'topieniem się',experiment,ch08,1950,1969,"Eksperymenty na szczurach: pytanie, co utrzymywało je na powierzchni.",W slajdach: przykład badań na zwierzętach w kontekście uczenia się i motywacji.,Richter|szczury|topienie się,85
e_milgram,"Posłuszeństwo wobec autorytetu (Milgram, 1965)",experiment,ch11,1965,1965,Klasyczny przykład problemów etycznych w badaniach psychologicznych.,W materiale wymieniony jako eksperyment dotyczący posłuszeństwa wobec autorytetu.,etyka|posłuszeństwo|autorytet,105
e_stanford,"Więzienie Stanford (Zimbardo, 1970)",experiment,ch11,1970,1970,Klasyczny przykład problemów etycznych w badaniach psychologicznych.,W slajdach wymieniony jako eksperyment więzienny Stanford.,etyka|role społeczne|więzienie,105
e_rosenhan,"Pseudopacjenci (Rosenhan, 1973)",experiment,ch11,1973,1973,Badanie o rzetelności i adekwatności diagnoz psychiatrycznych.,W materiale: pseudopacjenci i problem diagnoz medycznych psychiatrów.,diagnoza|psychiatria|rzetelność,105
e_landis,Eksperyment Landisa (1924) - emocje i wyraz twarzy,experiment,ch11,1924,1924,"Badanie, czy emocje tworzą charakterystyczny wyraz twarzy.",W materiale: Carney Landis opracował eksperyment o ekspresji emocji; wymieniony przy problemach etycznych i wywoływaniu emocji.,emocje|wyraz twarzy|etyka,105
m_intros,Introspekcja,method,ch05,UNKNOWN,UNKNOWN,Metoda opisu doświadczenia świadomości wykorzystywana w tradycji strukturalizmu.,W materiale pojawia się w wątku Wundta i Titchenera jako sposób badania treści świadomości.,świadomość|opis doświadczenia,27-32
m_clinobs,Obserwacja kliniczna,method,ch09,UNKNOWN,UNKNOWN,"Główna metoda w ujęciu psychodynamicznym, zamiast eksperymentu laboratoryjnego.",W slajdach: psychodynamiczna wyrosła z prób leczenia i obserwacji pacjentów.,klinika|psychopatologia,86
m_freeassoc,Metoda swobodnych skojarzeń,method,ch09,UNKNOWN,UNKNOWN,Technika psychoanalizy polegająca na swobodnym wypowiadaniu skojarzeń.,W materiale wymieniona wśród narzędzi psychoanalizy; obok analizy snów i przejęzyczeń.,psychoanaliza|skojarzenia,90
m_dreams,Analiza marzeń sennych,method,ch09,UNKNOWN,UNKNOWN,Technika psychoanalizy: sny jako zamaskowane zaspokojenie wypartych pragnień.,W slajdach: jedna z metod leczenia w psychoanalizie.,sny|wyparcie,90
m_operant,Warunkowanie instrumentalne,method,ch08,UNKNOWN,UNKNOWN,Uczenie się w wyniku konsekwencji zachowania: wzmocnienia i kara.,"W materiale: prawo nabywania, rola wzmocnień i modyfikacji zachowania w ujęciu Skinnera.",wzmocnienie|kara|prawo nabywania,78-82
m_modeling,Modelowanie (uczenie przez obserwację),method,ch08,UNKNOWN,UNKNOWN,Uczenie się przez obserwację zachowania innych i jego konsekwencji.,"W slajdach: wzmocnienie zastępcze i antycypowanie konsekwencji, w ramach ujęcia Bandury.",Bandura|wzmocnienie zastępcze,83
m_irb,Institutional Review Boards (1974),method,ch11,1974,1974,Systemowe mechanizmy nadzoru etycznego nad badaniami.,W materiale: powołanie IRB w 1974 i komisji etycznych przy uniwersytetach w Polsce.,etyka|komisje etyczne,105
p_milgram,Milgram,person,ch11,UNKNOWN,UNKNOWN,Badania posłuszeństwa wobec autorytetu (1965).,W slajdach wymieniony jako przykład problemów etycznych: posłuszeństwo wobec autorytetu (1965).,etyka|posłuszeństwo|autorytet,105
p_zimbardo,Zimbardo,person,ch11,UNKNOWN,UNKNOWN,Więzienie Stanford (1970) i problemy etyczne.,W slajdach wymieniony jako przykład problemów etycznych: eksperyment więzienny Stanford (1970).,etyka|więzienie stanford|role społeczne,105
p_rosenhan,Rosenhan,person,ch11,UNKNOWN,UNKNOWN,Pseudopacjenci (1973): rzetelność i adekwatność diagnoz.,W slajdach wymieniony jako przykład problemów etycznych i jakości diagnoz: pseudopacjenci (1973).,etyka|diagnoza|pseudopacjenci,105
p_landis,Carney Landis,person,ch11,UNKNOWN,UNKNOWN,Eksperyment o emocjach i wyraz twarzy (1924).,"W slajdach: w 1924 Carney Landis opracował eksperyment o tym, czy różne emocje mają charakterystyczny wyraz twarzy.",etyka|emocje|wyraz twarzy,105
p_huxley,Thomas Henry Huxley,person,ch06,UNKNOWN,UNKNOWN,W materiale w wątku prekursorów funkcjonalizmu i teorii ewolucji.,W slajdach pojawia się w części o prekursorach funkcjonalizmu (pytanie o rolę Huxleya w propagowaniu teorii ewolucji).,ewolucja|prekursorzy|funkcjonalizm,37`;

export const CSV_EDGES = `source_id,target_id,relation,note,source_pages
s_struct,ch05,in_chapter,,27-32
s_func,ch06,in_chapter,,33-49
s_gestalt,ch07,in_chapter,,50-69
s_behav,ch08,in_chapter,,70-85
s_psychodyn,ch09,in_chapter,,86
s_human,ch10,in_chapter,,97
p_wundt,ch05,in_chapter,,25-27
p_titchener,ch05,in_chapter,,32
p_darwin,ch06,in_chapter,,33-37
p_james,ch06,in_chapter,,40-47;74
p_woodworth,ch06,in_chapter,,45-46
p_lewin,ch07,in_chapter,,66-69
p_zeigarnik,ch07,in_chapter,,69
p_owsiankina,ch07,in_chapter,,69
p_thorndike,ch08,in_chapter,,70-72
p_pavlov,ch08,in_chapter,,73
p_watson,ch08,in_chapter,,74
p_skinner,ch08,in_chapter,,70;80-82
p_hull,ch08,in_chapter,,76
p_bandura,ch08,in_chapter,,83
p_rotter,ch08,in_chapter,,83
p_seligman,ch08,in_chapter,,84
p_maier,ch08,in_chapter,,84
p_richter,ch08,in_chapter,,85
p_freud,ch09,in_chapter,,89-90
p_adler,ch09,in_chapter,,96
p_jung,ch09,in_chapter,,96
p_rogers,ch10,in_chapter,,97
p_maslow,ch10,in_chapter,,97
p_vonosten,ch08,in_chapter,,72
p_stumpf,ch08,in_chapter,,72
p_pfungst,ch08,in_chapter,,72
p_heinrich,ch12,in_chapter,,112
p_twardowski,ch12,in_chapter,,112-113
p_abramowski,ch12,in_chapter,,112;115
p_weryho,ch12,in_chapter,,112
p_witwicki,ch12,in_chapter,,113;115
p_kreutz,ch12,in_chapter,,113
p_szewczuk,ch12,in_chapter,,114
p_szuman,ch12,in_chapter,,114
p_baley,ch12,in_chapter,,116
p_blachowski,ch12,in_chapter,,117
p_czezowski,ch12,in_chapter,,118
p_dybowski,ch12,in_chapter,,118
p_zawadzki,ch12,in_chapter,,118
p_ochorowicz,ch12,in_chapter,,113;119-127
e_hans,ch08,in_chapter,,72
e_puzzlebox,ch08,in_chapter,,72
e_lawofeffect,ch08,in_chapter,,72
e_classcond,ch08,in_chapter,,73
e_littlealbert,ch08,in_chapter,,75
e_zeigarnik,ch07,in_chapter,,69
e_owsiankina,ch07,in_chapter,,69
e_loc,ch08,in_chapter,,83
e_learnedhelpless,ch08,in_chapter,,84
e_richter,ch08,in_chapter,,85
e_milgram,ch11,in_chapter,,105
e_stanford,ch11,in_chapter,,105
e_rosenhan,ch11,in_chapter,,105
e_landis,ch11,in_chapter,,105
m_intros,ch05,in_chapter,,27-32
m_clinobs,ch09,in_chapter,,86
m_freeassoc,ch09,in_chapter,,90
m_dreams,ch09,in_chapter,,90
m_operant,ch08,in_chapter,,78-82
m_modeling,ch08,in_chapter,,83
m_irb,ch11,in_chapter,,105
p_milgram,ch11,in_chapter,,105
p_zimbardo,ch11,in_chapter,,105
p_rosenhan,ch11,in_chapter,,105
p_landis,ch11,in_chapter,,105
p_huxley,ch06,in_chapter,,37
p_wundt,s_struct,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,25-27
p_titchener,s_struct,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,32
p_darwin,s_func,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,33-37
p_james,s_func,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,40-47;74
p_woodworth,s_func,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,45-46
p_lewin,s_gestalt,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,66-69
p_zeigarnik,s_gestalt,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,69
p_owsiankina,s_gestalt,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,69
p_thorndike,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,70-72
p_pavlov,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,73
p_watson,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,74
p_skinner,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,70;80-82
p_hull,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,76
p_bandura,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,83
p_rotter,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,83
p_seligman,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,84
p_maier,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,84
p_richter,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,85
p_freud,s_psychodyn,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,89-90
p_adler,s_psychodyn,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,96
p_jung,s_psychodyn,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,96
p_rogers,s_human,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,97
p_maslow,s_human,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,97
p_vonosten,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,72
p_stumpf,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,72
p_pfungst,s_behav,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,72
p_huxley,s_func,member_of,Osoba omawiana w ramach tego nurtu w wykładzie.,37
e_hans,s_behav,example_in,Przykład/badanie omawiane przy tym nurcie w wykładzie.,72
e_puzzlebox,s_behav,example_in,Przykład/badanie omawiane przy tym nurcie w wykładzie.,72
e_lawofeffect,s_behav,example_in,Przykład/badanie omawiane przy tym nurcie w wykładzie.,72
e_classcond,s_behav,example_in,Przykład/badanie omawiane przy tym nurcie w wykładzie.,73
e_littlealbert,s_behav,example_in,Przykład/badanie omawiane przy tym nurcie w wykładzie.,75
e_zeigarnik,s_gestalt,example_in,Przykład/badanie omawiane przy tym nurcie w wykładzie.,69
e_owsiankina,s_gestalt,example_in,Przykład/badanie omawiane przy tym nurcie w wykładzie.,69
e_loc,s_behav,example_in,Przykład/badanie omawiane przy tym nurcie w wykładzie.,83
e_learnedhelpless,s_behav,example_in,Przykład/badanie omawiane przy tym nurcie w wykładzie.,84
e_richter,s_behav,example_in,Przykład/badanie omawiane przy tym nurcie w wykładzie.,85
m_intros,s_struct,method_in,Metoda/pojęcie omawiane w ramach tego nurtu w wykładzie.,27-32
m_clinobs,s_psychodyn,method_in,Metoda/pojęcie omawiane w ramach tego nurtu w wykładzie.,86
m_freeassoc,s_psychodyn,method_in,Metoda/pojęcie omawiane w ramach tego nurtu w wykładzie.,90
m_dreams,s_psychodyn,method_in,Metoda/pojęcie omawiane w ramach tego nurtu w wykładzie.,90
m_operant,s_behav,method_in,Metoda/pojęcie omawiane w ramach tego nurtu w wykładzie.,78-82
m_modeling,s_behav,method_in,Metoda/pojęcie omawiane w ramach tego nurtu w wykładzie.,83
p_witwicki,p_wundt,studied_with,Studiował w Lipsku pod kierunkiem Wundta.,113
p_ochorowicz,p_wundt,influenced_by,Łączył wiedzę nabytą w laboratorium Wundta z innymi doświadczeniami.,113
p_darwin,s_func,precursor_of,"Slajd ""Prekursorzy funkcjonalizmu"" opisuje Darwina jako kontekst funkcjonalizmu.",33
e_hans,p_stumpf,studied_by,Konia badał psycholog Carl Stumpf.,72
e_hans,p_pfungst,studied_by,Konia badał doktorant Oskar Pfungst.,72
e_puzzlebox,p_thorndike,studied_by,Thorndike badał koty w skrzynce problemowej.,72
e_lawofeffect,p_thorndike,introduced_by,Prawo efektu 1898 r. w kontekście badań Thorndike’a.,72
e_classcond,p_pavlov,studied_by,Warunkowanie klasyczne w kontekście badań Pawłowa.,73
e_littlealbert,p_watson,studied_by,"Badanie ""Albert i biały szczur"" omawiane przy Watsonie.",75
e_zeigarnik,p_zeigarnik,introduced_by,Efekt Zeigarnik omawiany wraz z autorką.,69
e_owsiankina,p_owsiankina,introduced_by,Efekt Owsiankiny omawiany wraz z autorką.,69
e_loc,p_rotter,introduced_by,Poczucie umiejscowienia kontroli (1966) przy Rotterze.,83
e_learnedhelpless,p_seligman,studied_by,Wyuczona bezradność (1967) w slajdach z nazwiskami autorów.,84
e_learnedhelpless,p_maier,studied_by,Wyuczona bezradność (1967) w slajdach z nazwiskami autorów.,84
e_richter,p_richter,studied_by,"Badania Richtera nad ""topieniem się"".",85
e_milgram,p_milgram,studied_by,"Milgram, 1965: posłuszeństwo wobec autorytetu.",105
e_stanford,p_zimbardo,studied_by,"Zimbardo, 1970: więzienie Stanford.",105
e_rosenhan,p_rosenhan,studied_by,"Rosenhan, 1973: pseudopacjenci.",105
e_landis,p_landis,studied_by,"Carney Landis, 1924: emocje i wyraz twarzy.",105`;
