import AssociativeArray from '../Core/AssociativeArray'
import Event from '../Core/Event'
import createGuid from '../Core/createGuid'
import CompositeEntityCollection from './CompositeEntityCollection'
import Entity from './Entity'

import type DataSource from './DataSource'

class EntityCollection {

  private _owner: DataSource | CompositeEntityCollection
  private _entities: AssociativeArray
  private _addedEntities: AssociativeArray
  private _removedEntities: AssociativeArray
  private _changedEntities: AssociativeArray
  private _suspendCount: number
  private _collectionChanged: Event
  private _id: string
  private _show: boolean
  private _firing: boolean
  private _refire: boolean

  constructor(owner: DataSource | CompositeEntityCollection) {
    this._owner = owner;
    this._entities = new AssociativeArray();
    this._addedEntities = new AssociativeArray();
    this._removedEntities = new AssociativeArray();
    this._changedEntities = new AssociativeArray();
    this._suspendCount = 0;
    this._collectionChanged = new Event();
    this._id = createGuid();
    this._show = true;
    this._firing = false;
    this._refire = false;
  }

  suspendEvents() { }

  resumeEvents() { }

  remove(entity: Entity) { }

  contains(entity: Entity) { }

  removeById(id: string) { }

  removeAll() { }

  getById(id: string) { }

  getOrCreateEntity(id: string) { }

  private _onEntityDefinitionChanged(entity: Entity) {

  }
}

export default EntityCollection
