#!/usr/bin/env sh

echo "######## SELECCIONA ###########"
options=("RESTORE" "BACKUP")
select opt in "${options[@]}" "Quit"; do
    case $opt in
        "REAL")
            echo "######## BBDD RESTORE ###########"
           bash ./bin/ddbb-restore.sh 
            break
            ;;
        "BACKUP")
            echo "######## BBDD BACKUP ###########"
           bash ./bin/database-backup.sh 
            break
            ;;
        "Quit")
            break
            ;;
    esac
done

