Τρέχουμε το αρχείο lalaserver.py, που είναι ο server που λαμβάνει τις μετρήσεις και τις αποθηκεύει στη βάση.
Τρέχουμε το cclientgui.py που είναι ο simulator/BPDevice
Kάθε προσωρινή μέτρηση αποθηκεύεται στο self_rc.json και κάθε μέτρηση αποθηκεύεται κανονικά και στο MS SQL Server στο TestDB και table= Person
Πηγαίνοντας στο cmd να δείχνει μέσα στο φάκελο nodeapp, τρέχουμε τον web server με npm start
Πληκτρολογούμε στο browser: http://localhost:3000/Person/user-list
