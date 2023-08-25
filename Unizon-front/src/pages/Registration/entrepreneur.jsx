import * as React from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomId
} from '@mui/x-data-grid-generator';

import axios from '../../axios';
import styles from './Enterpreneur.module.scss';

const steps = ['Основная информация', 'Инвестиции', 'Вашей команде не нужны пополнения?'];

export const NewProject =() => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [projectName, setProjectName] = React.useState("");
  const [aboutProject, setAboutProject] = React.useState("");
  const [countCommand, setCountCommand] = React.useState("");
  const [command, setCommand] = React.useState("");
  const [investment, setInvestment] = React.useState("");
  const [sizeOfInvestment, setSizeOfInvestment] = React.useState("");
  const [vacances, setVacances] = React.useState("");
  const [investors, setInvestors] = React.useState({});

  const changeCountCommand = (event) => {
    setCountCommand(event.target.value);
  };


  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Добавить инвестора
      </Button>
    </GridToolbarContainer>
  );
}

  const onSubmitProject = async() => {
        try {
        const fields = {
            projectName,
            aboutProject,
            countCommand,
            command,
            investment,
            sizeOfInvestment,
            vacances,
            investors,
        };


        const {data} = await axios.post(`/newProject`, fields)
        
        data ? alert("Вакансия создан") : alert("Проект не создан")


        } catch (err) {
        console.warn(err);
        alert('Ошибка при редактировании профиля!');
        }
    }

  
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setInvestors(rowModesModel);
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setInvestors(rowModesModel);
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    setInvestors(rowModesModel);
  };
  console.log(investors)
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'Инвестор', headerName: 'Инвестор', width: 180, editable: true },
    {
      field: 'Размер инвестиций',
      headerName: 'Размер инвестиций',
      type: 'number',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'Дата инвестиций',
      headerName: 'Дата инвестиций',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'Действия',
      type: 'actions',
      headerName: 'Действия',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const isStepOptional = (step) => {
    return (step === 1 || step === 2) ;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Можно пропустить</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : ( 
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 ? 
            (<div>
              <div>
                  <div className={styles.field}>
                      Название проекта
                  </div>
                  <div>
                      <TextField
                      className={styles.fieldButton} 
                      label="Название вашего проекта" 
                      defaultValue={projectName}
                      onChange={e => setProjectName(e.target.value)}
                      fullWidth />
                  </div>
                  <div className={styles.line}>
                      <hr/>
                  </div>
              </div>
              <div>
                  <div className={styles.field}>
                      Описание проекта
                  </div>
                  <div>
                      <TextField
                      className={styles.fieldButton}
                      multiline
                      label="Расскажите о вашем проекте"
                      defaultValue={aboutProject}
                      onChange={e => setAboutProject(e.target.value)}
                      fullWidth />
                  </div>
                  <div className={styles.line}>
                      <hr/>
                  </div>
              </div>
              <div>
                  <div className={styles.field}>
                      Размер команды
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <Select
                      className={styles.fieldButton} 
                      value={countCommand}
                      select
                      onChange={changeCountCommand}
                      fullWidth >
                        <MenuItem value={"1-5"}>1-5</MenuItem>
                        <MenuItem value={"5-10"}>5-10</MenuItem>
                        <MenuItem value={"10-20"}>10-20</MenuItem>
                        <MenuItem value={"20-50"}>20-50</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.line}>
                      <hr/>
                  </div>
              </div>
            </div>) : (null)}
            {activeStep === 1 ? 
            (<div>
              <div>
                  <div className={styles.field}>
                      Количество поднятых раундов
                  </div>
                  <div>
                      <TextField
                      className={styles.fieldButton} 
                      label="Сколько поднятых раундов у вашего проекта?" 
                      defaultValue={investment}
                      onChange={e => setInvestment(e.target.value)}
                      fullWidth />
                  </div>
                  <div className={styles.line}>
                      <hr/>
                  </div>
              </div>
              <div>
                  <div className={styles.field}>
                      Общий объём инвестиций
                  </div>
                  <div>
                      <TextField
                      className={styles.fieldButton}
                      multiline
                      label="Какой общий объем у вашего проекта?"
                      defaultValue={sizeOfInvestment}
                      onChange={e => setSizeOfInvestment(e.target.value)}
                      fullWidth />
                  </div>
                  <div className={styles.line}>
                      <hr/>
                  </div>
              </div>
              <Box
                      sx={{
                        height: 500,
                        width: '100%',
                        '& .actions': {
                          color: 'text.secondary',
                        },
                        '& .textPrimary': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        slots={{
                          toolbar: EditToolbar,
                        }}
                        slotProps={{
                          toolbar: { setRows, setRowModesModel },
                        }}
                        />
                      </Box>
            </div>) : (null)}
            {activeStep === 2 ? 
            (<div>
              <div>
                  <div className={styles.field}>
                      Доступные вакансии
                  </div>
                  <div>
                      <TextField
                      className={styles.fieldButton} 
                      label="Какие вакансии открыты в вашем проекте?" 
                      defaultValue={vacances}
                      onChange={e => setVacances(e.target.value)}
                      fullWidth />
                  </div>
                  <div className={styles.line}>
                      <hr/>
                  </div>
              </div>
              <div>
                  <div className={styles.field}>
                      Информация о команде
                  </div>
                  <div>
                      <TextField
                      className={styles.fieldButton}
                      multiline
                      label="ФИО Участников и их должности"
                      defaultValue={command}
                      onChange={e => setCommand(e.target.value)}
                      fullWidth />
                  </div>
                  <div className={styles.line}>
                      <hr/>
                  </div>
              </div>
            </div>) : (null)}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? (null) : 'Next'}
            </Button>
            {activeStep === steps.length - 1 ? 
            (<div>
              <Button type='submit' size="large" variant="contained" fullWidth className={styles.submit} onClick={onSubmitProject}>
                  Создать проект!
              </Button>
            </div>) : (null)}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}