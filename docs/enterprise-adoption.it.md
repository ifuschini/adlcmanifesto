# Guida all'adozione enterprise dell'ADLC

Questa guida rende operativi il [manifesto](../manifesto.md), il [lifecycle](../lifecycle.md) e le [skill condivise](../shared-skills.md). È un modello di adozione illustrativo, non una certificazione, una garanzia di conformità o un insieme universale di soglie. Adattare i controlli all'impatto sul business e al modello di rischio dell'organizzazione. La [versione inglese](enterprise-adoption.md) è la fonte di riferimento.

La Knowledge Governance copre documenti, prompt, skill condivise, policy, memoria e contesto runtime, indipendentemente da come vengono forniti. La generazione aumentata dal recupero di informazioni (RAG) è una tecnica opzionale, non un prerequisito dell'ADLC. Ove utilizzata, governare qualità del retrieval, aggiornamento delle fonti, autorizzazioni di accesso e citazioni, insieme ai test di regressione comportamentale. Il context engineering compone il contesto operativo dell'agent; non sostituisce questi controlli di governance.

## 1. Approvare il prossimo incremento

**Nessuna implementazione inizia senza aver superato il quality gate dei requisiti.**

Approvare l'ambito del prossimo incremento, anziché cercare di fissare tutti i requisiti futuri. Registrare i responsabili business, ingegneristici e del rischio; il risultato atteso; criteri di accettazione misurabili; dati autorizzati; incertezze note; condizioni che richiedono una nuova approvazione.

Confrontare automazione deterministica, workflow LLM, singolo agent e orchestrazione multi-agent. Usare il minimo livello di autonomia e complessità necessario al risultato validato. Un maggior numero di agent non dimostra maggiore maturità.

Per un esperimento, l'incremento approvato deve specificare ipotesi, sandbox, dati consentiti, budget e criteri di uscita. L'approvazione sperimentale non concede accesso alla produzione. Un quality gate agent può preparare evidenze, ma non sostituire la decisione umana responsabile.

## 2. Definire un contratto di autonomia

Versionare il contratto insieme all'implementazione e alle evidenze di rilascio:

| Controllo | Decisione richiesta |
| --- | --- |
| Responsabilità | Responsabile business, operatore tecnico, revisore del rischio e percorso di escalation nominati |
| Autorità | Azioni consentite e vietate, ruoli delegati e confini dell'approvazione umana |
| Dati | Fonti consentite, classificazione, ambito di tenant e utente, destinazioni degli output |
| Limiti | Budget di costo, tempo, chiamate ai tool e tentativi; impatto massimo della transazione o sul business |
| Enforcement | Credenziali a privilegio minimo e controlli di policy al confine del tool o servizio, non solo nei prompt |
| Approvazione | Approvatore autorizzato, azione esatta e versione degli input approvate, scadenza e nuova approvazione dopo modifiche sostanziali |
| Arresto e recupero | Condizioni di arresto, revoca, operatività degradata, responsabili di riconciliazione e compensazione |
| Delega | Gli agent a valle ereditano o restringono l'autorità; non possono aumentarla silenziosamente |

Testare le azioni vietate oltre a quelle consentite. Documenti recuperati, risposte dei tool e altri contenuti non attendibili non possono sovrascrivere il contratto. Registrare decisioni ed esiti dei tool senza includere segreti o dati personali non necessari.

### Rendere efficace la supervisione umana

Supervisione competente, non approvazione rituale. Assegnare revisori formati sul dominio, sui limiti degli agent e sui rischi decisionali. Prima di affidare compiti di approvazione, usare esercitazioni proporzionate al rischio con raccomandazioni errate, evidenze mancanti e incidenti, per verificare che i revisori riconoscano l'incertezza e sappiano intervenire. Aggiornare la formazione dopo cambiamenti sostanziali o incidenti rilevanti.

- Fornire fonti, evidenze, limiti noti, incertezze e conseguenze dell'azione proposta, non solo la raccomandazione dell'agent.
- Garantire tempo sufficiente e carico di lavoro gestibile. Se non è possibile una revisione sostanziale, sospendere l'azione o indirizzarla a un'alternativa autorizzata; non approvarla implicitamente.
- Concedere autorità effettiva per contestare, rifiutare, sospendere, richiedere revisioni e attivare escalation, senza dipendere dalla collaborazione dell'agent.
- Registrare revisore, evidenze esaminate, decisione e motivazione proporzionata al rischio. Campionare periodicamente la qualità delle decisioni e indagare segnali di approvazione abituale; il numero di approvazioni da solo non dimostra supervisione.

Un'approvazione formale senza verifica sostanziale non è un controllo di governance.

## 3. Governare conoscenza, contesto e memoria

Mantenere documentazione umana e contesto degli agent collegati ma separati. La documentazione umana supporta lettura, revisione e audit. Gli endpoint per agent espongono contesto approvato e pertinente al task, con URL stabili, accesso autenticato dove necessario, ownership delle fonti, versioni, stato di approvazione e regole di retrieval.

Snapshot versionati delle fonti e configurazione del retrieval fanno parte delle evidenze di rilascio. La memoria modificabile richiede invece una cronologia governata degli eventi: origine, autore autorizzato, ambito, timestamp, conservazione, correzione e cancellazione. Isolare utenti e tenant; definire come risolvere fatti contraddittori o obsoleti. Non promuovere automaticamente un'inferenza dell'agent a conoscenza autorevole.

La compressione del contesto deve risparmiare token senza rimuovere permessi, vincoli, provenienza delle fonti o evidenze necessarie a una decisione corretta. Valutare il contesto compresso rispetto agli stessi requisiti comportamentali. Un URL, una connessione MCP o un file llms.txt da soli non stabiliscono fiducia o autorizzazione.

## 4. Valutare il comportamento prima della promozione

Costruire un dataset rappresentativo e versionato, collegato a requisiti e casi di rischio. Includere risultati normali, richieste ambigue, azioni non autorizzate, injection, conoscenza avvelenata o obsoleta, errori di retrieval, accesso tra tenant, timeout dei tool, richieste duplicate, escalation e comportamento di arresto.

Ripetere le prove con stato isolato. Registrare dataset, configurazione del modello, prompt, tool, versioni della conoscenza e dei valutatori, dimensione del campione, variabilità e lacune di copertura. Esaminare cambiamenti di stato effettivi e rispetto delle policy, non soltanto una risposta finale plausibile o una sequenza esatta di chiamate. Calibrare i valutatori basati su modelli rispetto ai giudizi degli esperti di dominio e riesaminare i disaccordi.

Concordare soglie di accettazione basate sul rischio prima dei test. Il fallimento di un controllo obbligatorio blocca la promozione. Un insieme finito di test non può provare l'assenza di guasti futuri. Ripetere i test di regressione pertinenti ogni volta che cambia un input capace di influenzare il comportamento, anche senza modifiche al codice.

## 5. Rilasciare, operare e recuperare

Le evidenze di rilascio devono collegare requisito, fonte di conoscenza, comportamento dell'agent, risultato del test, approvazione e identità della release. Includere tutti gli input che influenzano il comportamento, contratto di autonomia, limiti noti, piano di rollout ed esercitazioni di recupero.

Distinguere tre operazioni:

- **Rollback della configurazione:** ripristinare, ove disponibile, una precedente configurazione di codice, prompt, conoscenza, tool o modello.
- **Ripristino dello stato:** ripristinare o riconciliare lo stato interno senza ripetere effetti esterni.
- **Compensazione:** applicare un'azione business autorizzata separatamente per gestire un effetto esterno che non può essere semplicemente annullato.

Usare rollout graduali e controlli preventivi per azioni irreversibili. Definire cosa accade se un approvatore è indisponibile, un tool restituisce un esito incerto o un budget si esaurisce. I tentativi limitati non devono duplicare pagamenti o altri effetti.

Monitorare successi, violazioni di policy, deriva, qualità del retrieval, costo per task riuscito, latenza, interventi umani, rilavorazioni, escalation e valore business rispetto alla baseline. Includere nel costo tentativi falliti e gestione umana. Le evidenze possono giustificare un workflow più semplice, minore autonomia o dismissione. La dismissione comprende revoca delle credenziali, disabilitazione di endpoint e attività pianificate, conservazione o cancellazione di memoria ed evidenze secondo la policy approvata.

## Esempio completo: assistenza ai rimborsi

I numeri seguenti sono soglie illustrative per un progetto pilota, non requisiti ADLC.

| Fase | Controllo ed evidenze |
| --- | --- |
| Requisiti | Approvare un incremento che prepara raccomandazioni di rimborso da un ordine e una policy approvata. Confrontare con una baseline basata solo su regole. Puntare a ridurre del 20% il tempo mediano di gestione senza ridurre la qualità decisionale valutata indipendentemente. |
| Adeguatezza | Usare un workflow LLM delimitato per interpretare richieste e spiegare raccomandazioni. Ammissibilità e limiti monetari restano deterministici. Non serve un sistema multi-agent per questo incremento. |
| Autorità | Leggere solo l'ordine del cliente autenticato e la policy approvata. Il workflow non può modificare policy, destinazione del pagamento o identità del cliente. Una persona approva ogni rimborso rispetto a un ID immutabile della proposta e all'importo esatto. |
| Implementazione | Il servizio di pagamento verifica autorizzazione, versione della proposta, scadenza dell'approvazione e chiave di idempotenza prima di eseguire. Input modificati invalidano l'approvazione. Approvazione mancante o scaduta indirizza a una coda umana senza esecuzione. |
| Conoscenza | Fissare la versione della policy di rimborso approvata e della configurazione del retrieval. Definire la conservazione del contesto temporaneo del caso; vietare memoria condivisa tra clienti e aggiornamenti della policy scritti dagli agent. |
| Valutazione | Usare 200 casi revisionati, ciascuno eseguito cinque volte con stato isolato, includendo injection, approvazioni scadute, accesso tra clienti, richieste duplicate e timeout dei pagamenti. Richiedere zero pagamenti non autorizzati o duplicati osservati, almeno il 95% di accordo con gli esiti di ammissibilità stabiliti dalla revisione e escalation per ogni caso incerto definito. Riportare limiti del campione e disaccordi. |
| Approvazione e rilascio | Responsabili business e del rischio approvano soglie, eccezioni e rischio residuo. I revisori dei rimborsi svolgono esercitazioni su importi errati, policy obsolete ed esiti di pagamento incerti. Esaminano ordine, fonte della policy, importo e conseguenze, con tempo e autorità per rifiutare o sospendere. Registrare evidenze esaminate e motivazioni. Collegare RF-01 a versione della policy, comportamento della proposta, rapporto di valutazione, controlli del servizio e ID della release. Iniziare con un piccolo gruppo supervisionato. |
| Operatività | Monitorare tempo di gestione, qualità, escalation, rilavorazioni e costo totale per caso risolto, inclusi tentativi e lavoro umano. Fermare l'esecuzione automatica in caso di azione non autorizzata, controllo di approvazione non funzionante o segnale di pagamento duplicato. |
| Incidente e recupero | Dopo un timeout, interrogare il servizio di pagamento con la chiave di idempotenza prima di riprovare. Sospendere l'esecuzione e revocare l'accesso se necessario. Ripristinare policy o configurazione precedenti; riconciliare lo stato del caso con il registro dei pagamenti. Un rimborso completato non si annulla con un rollback della configurazione: un responsabile business autorizzato decide le compensazioni consentite o i rimedi per il cliente. |
| Miglioramento o dismissione | Aggiungere l'incidente ai casi di regressione e riapprovare l'incremento modificato. Se l'obiettivo di qualità o valore non è raggiunto, tornare alla sola raccomandazione o dismettere il workflow, gestendo accessi e memoria secondo policy. |

## Registro delle evidenze riutilizzabile

Mantenere un record collegato per ogni incremento approvato e release:

- ID del requisito, responsabile, risultato, decisione di adeguatezza, baseline, rischi e approvazione.
- Contratto di autonomia versionato, permessi, fonti di conoscenza, policy della memoria e controlli runtime.
- Inventario delle modifiche a codice, prompt, skill, conoscenza, tool, configurazione del modello e orchestrazione.
- Versioni del dataset e dei valutatori, risultati delle prove, soglie, lacune di copertura e revisione umana.
- Autorizzazione al rilascio, ambito del rollout, criteri di arresto ed esiti delle esercitazioni di recupero.
- Risultati operativi, incidenti, decisioni correttive e prossimo incremento approvato o record di dismissione.

## Riferimenti specialistici

Queste fonti hanno informato le pratiche descritte; la guida è un adattamento ADLC, non una dichiarazione di approvazione o certificazione.

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) spiega semplicità e compromessi tra workflow e agent.
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) tratta valutazioni ripetute, risultati e calibrazione dei valutatori.
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) copre gestione del contesto e memoria.
- [OWASP: Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) offre una prospettiva sui controlli agentici basata sulle minacce.
- [Microsoft: AI agent orchestration patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns) descrive compromessi di orchestrazione e problemi di affidabilità.
- [NIST: AI Risk Management Framework core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) inquadra governance e gestione del rischio lungo il ciclo di vita.
