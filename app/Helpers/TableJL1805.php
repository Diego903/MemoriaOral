<?php
namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class TableJL1805
{
	protected $query = null;
	protected $config = [
	  		'rows_current'=>10,
			'search_value'=>'',
			'column'=>null,//columna por la cual se está ordenando
			'direction'=>null,//direccion de ordenamiento//desc, asc
			'headers'=>[//datos de prueba
				'first_name',
				'last_name',
				'age',
				'date'
			]
	];

    public function __construct($query, $config)
    {
        $this->query = $query;
        $this->config = array_merge($this->config, $config);
    }

    public function make(){
    	$this->query = $this->query->where(function($q)
    	{
    		$search = '%'.$this->config['search_value'].'%';
    		$headers = $this->config['headers'];

    		$q->where($headers[0],'like', $search);

			for ($i = 1; $i < count($headers); $i++) {
				$q->orWhere($headers[$i],'like', $search);				
			}
    	});


    	if($this->config['direction'] && $this->config['column']){
    		$this->query = $this->query->orderBy($this->config['column'], $this->config['direction']);
    	}

    	return $this->query->paginate($this->config['rows_current']);
    }
}
