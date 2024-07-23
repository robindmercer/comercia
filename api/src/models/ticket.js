const { DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('ticket', {
        tck_id:      {type: DataTypes.INTEGER, allowNull: false,},
        tck_linea:   {type: DataTypes.INTEGER, allowNull: false,},
        serie:       {type: DataTypes.STRING,  allowNull: false,},
        description: {type: DataTypes.TEXT,    allowNull: false,},
        detecta:     {type: DataTypes.STRING,  allowNull: false,},
        cli_id:      {type: DataTypes.INTEGER, allowNull: false,}, // Quien detecta
        evidencia:   {type: DataTypes.TEXT,    allowNull: false,},     
        porque1:     {type: DataTypes.STRING,  allowNull: false,},
        porque2:     {type: DataTypes.STRING,  allowNull: false,},
        porque3:     {type: DataTypes.STRING,  allowNull: false,},
        porque4:     {type: DataTypes.STRING,  allowNull: false,},
        porque5:     {type: DataTypes.STRING,  allowNull: false,},
        analisis:    {type: DataTypes.STRING,  allowNull: false,},//Conclucion del analisis
        chkbox:      {type: DataTypes.STRING,  allowNull: false,},// Punto 3,4 y 5 son 9 los check's
        responsable: {type: DataTypes.STRING,  allowNull: false,},// Nombre del responsable punto 4
        actividad:   {type: DataTypes.STRING,  allowNull: false,},// Punto 6 Actividad
        fact:        {type: DataTypes.DATE,    allowNull: false,}, // Fecha ctividad
        evi_act:     {type: DataTypes.TEXT,    allowNull: false,}, // Evidencia Actividad
        conclusion:  {type: DataTypes.TEXT,    allowNull: false,}, // Punto 7
// Datos propios         
        usr:         {type: DataTypes.STRING,  allowNull: false,},
        perfil:      {type: DataTypes.INTEGER,  allowNull: false,},// a que departamento 
        prioridad:   {type: DataTypes.INTEGER, allowNull: false,},// Alta media baja      
        cod_status:  {type: DataTypes.INTEGER, allowNull: false,},// Abierto Cerrado 
        alta:        {type: DataTypes.DATE,    allowNull: false,defaultValue: DataTypes.NOW},        
        cierre:      {type: DataTypes.DATE,    allowNull: false,defaultValue: DataTypes.NOW},
    },
    { timestamps: false ,
        freezeTableName: true
    }    
);
};