import React, { useState } from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ButtonGroup, Button, TextField } from '@material-ui/core';
import AceEditor from 'react-ace';
import { diff as DiffEditor } from "react-ace";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    centerStyle: {
        display: 'flex',
        justifyContent: 'center',
    },
    textAreaStyle: {
        width: '90%',
        padding: 15,
    },
    aceEditorStyle: {
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid lightgray',
        padding: 15,
        flex: 1
    },
    label: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center'
    }
}));



export default function HomeContainer() {
    
    const classes = useStyles();
    

    const [logMessage, setlogMessage] = useState("...");
    const [snapOne, setsnapOne] = useState("");
    const [snapTwo, setsnapTwo] = useState("");
    const [notes, setnotes] = useState([])

    const compare = () => {
        if(snapOne == snapTwo){
            setlogMessage("Execution says: They are the same")
        }else{
            const linesSnapOne = snapOne.split("\n");
            const linesSnapTwo = snapTwo.split("\n");

           

            if(linesSnapOne.length > linesSnapTwo.length){
                let diff = linesSnapOne.length - linesSnapTwo.length;

                for(let i = 0; i<= diff-1; i++){
                    linesSnapTwo.push("")
                }
            }else if(linesSnapTwo.length > linesSnapOne.length){
                let diff = linesSnapTwo.length - linesSnapOne.length;

                for(let i = 0; i<= diff -1; i++){
                    linesSnapOne.push("")
                }
            }
            let tempNotes = []

            for(let j = 0; j <= linesSnapOne.length; j++){

                if(linesSnapOne[j] != linesSnapTwo[j]){
                    tempNotes.push({
                        row: j, column: 0, type: 'error', text: 'Something is different here.'
                    })
                }
            }

            setnotes(tempNotes)

            setlogMessage("Execution says: Something is different! Check on the editors")
        }
    }

    return ( 
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6} >
                    <p className={classes.label} >Text 1</p>
                    <Paper className={classes.aceEditorStyle}>
                        <AceEditor onChange={v => setsnapOne(v)} 
                        annotations={notes}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <p className={classes.label}>Text 2</p>

                    <Paper className={classes.aceEditorStyle}>
                        <AceEditor onChange={v => setsnapTwo(v)} 
                        annotations={notes}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} className={classes.centerStyle}>
                    <TextField
                        className={classes.textAreaStyle}
                        id="outlined-multiline-static"
                        label="Log"
                        multiline
                        rows={4}
                        variant="outlined"
                        disabled
                        value={logMessage}
                    />
                </Grid>
                <Grid item xs={12} className={classes.centerStyle}> 
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button onClick={compare} >COMPARE</Button>
                        <Button onClick={_ => window.location.reload()} > RESTART</Button>
                    </ButtonGroup> 
                </Grid>
           
            </Grid>

        </div>
    )
    
}